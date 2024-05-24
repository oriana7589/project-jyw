import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import SearchIcon from "@mui/icons-material/Search";
import Paper from "@mui/material/Paper";
import Cliente from "./Cliente";
import Typography from "@mui/material/Typography";
import { Container, TextField } from "@mui/material";
import DialogCliente from "../components/DialogCliente";
import {
  getClientes,
  getDatosVentasPorClientePorAño,
  getUltimosDocumentosCliente,
  getPromedioCompraCliente,
  getPromedioItemsCliente,
  getPromedioComprasAlMesCliente,
  getRankingClientes,
  getUltimasComprasCliente,
  getItemsMasComprados,
  getProdutosFiltrados,
  getProductoSeleccionado,
  getFechaLlegadaProductoSeleccionado,
  getHistorialPrecios,
  getListVendedores,
  getCambioDeMoneda,
  getFormaDePago,
  getTipoMonedas,
  getTransportistas,
  getSugeridosPorClientePorCantidad,
  getArticulosSugeridos,
  getPDFDataTecnica,
  postPGenerarProforma,
  putActualizarProforma,
  getSeleccionarProformaCabecera,
  getSeleccionarProformaDetalle,
  getSugeridosPorClientePorMonto
} from "../Services/ApiService";
import Items from "./Items";
import DialogProductos from "../components/DialogProductos";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Decimal from "decimal.js";
import imagenNoDisponible from "../image/imagen-no-disponible.jpeg";

const TuComponente = () => {
  const [expandedPanels, setExpandedPanels] = useState([1]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [dialogProductOpen, setDialogProductOpen] = useState(false);
  const [criterioBusqueda, setCriterioBusqueda] = useState("");
  const [criterio1, setCriterio1] = useState("");
  const [criterio2, setCriterio2] = useState("");
  const [criterio3, setCriterio3] = useState("");
  const [numeroProforma, setNumeroProforma] = useState("");
  const [clientes, setClientes] = useState([]);
  const [items, setItems] = useState([]);
  const [proformaSeleccionada, setProformaSeleccionada] = useState([]);
  const [proformaDetalle, setProformaDetalle] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedItems, setSelectedItems] = useState(null);
  const [dataGraficaActual, setDataGraficaActual] = useState([]);
  const [dataGraficaAnterior, setDataGraficaAnterior] = useState([]);
  const [dataDocumentos, setDataDocumentos] = useState([]);
  const [ultimasCompras, setUltimasCompras] = useState([]);
  const [itemsComprados, setItemsComprados] = useState([]);
  const [promedioCompra, setPromedioCompra] = useState(0);
  const [detalleProducto, setDetalleProducto] = useState({});
  const [fechaLlegada, setfechaLlegada] = useState({});
  const [promedioItems, setPromedioItems] = useState(0);
  const [promedioComprasAlMes, setPromedioComprasAlMes] = useState(0);
  const [ranking, setRanking] = useState([]);
  const [articuloSugerido, setArticuloSugerido] = useState([]);
  const [articuloSugeridoCliente, setArticuloSugeridoCliente] = useState([]);
  const [articuloSugeridoClientePorMonto, setArticuloSugeridoClientePorMonto] =
    useState([]);
  const [articuloSugeridoCliente75, setArticuloSugeridoCliente75] = useState(
    []
  );
  const [
    articuloSugeridoClientePorMonto75,
    setArticuloSugeridoClientePorMonto75,
  ] = useState([]);
  const [rankingClienteSeleccionado, setRankingClienteSeleccionado] =
    useState("S/R");
  const [fechasGrafica, setFechasGrafica] = useState([
    new Date().getFullYear(),
    new Date().getFullYear() - 1,
  ]);
  const [hayDatosDisponibles, setHayDatosDisponibles] = useState(false);
  const [datosDisponibles, setDatosDisponibles] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]); // Estado para el arreglo que quieres pasar a CardList
  const [cartItemsSoles, setCartItemsSoles] = useState([]);
  const [historialPrecios, setHistorialPrecios] = useState([]);
  const [formaPago, setFormaPago] = useState([]);
  const [tipoMoneda, setTipoMoneda] = useState([]);
  const [transportistas, setTransportistas] = useState([]);
  const [vendedores, setVendedores] = useState([]);
  const [moneda, setMoneda] = useState(0.0);
  const [descuentoA, setDescuentoA] = useState(0);
  const [descuentoB, setDescuentoB] = useState(0);
  const [monto, setMonto] = useState(0.0);
  const [ticketCount, setTicketCount] = useState(1);
  const [codigoSeleccionado, setCodigoSeleccionado] = useState(null);
  const [monedaValue, setMonedaValue] = useState("DOLARES AMERICANOS");
  const [vendedor, setVendedor] = React.useState("");
  const [formaPagos, setFormaPagos] = React.useState("");
  const [transporte, setTransporte] = React.useState("");
  const [pdfData, setPDFData] = React.useState("");
  const [cantidad, setCantidad] = React.useState(0);
  const [dias, setDias] = React.useState("");
  const [fechaE, setFechaE] = React.useState("");
  const [fechaV, setFechaV] = React.useState("");
  const [observaciones, setObservaciones] = React.useState("");
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [isAddToCartVisible, setIsAddToCartVisible] = useState(true);
  const [isEditToCartVisible, setIsEditToCartVisible] = useState(true);
  const [isAddProformaVisible, setIsAddProformaVisible] = useState(true);
  const [isEditProformaVisible, setIsEditProformaVisible] = useState(false);
  const [totalSubtotal, setTotalSubtotal] = useState(0);
  const [total1, setTotal1] = useState(0);
  const [produtosSugeridosCliente, setProductosSugeridosCliente] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [monedaType, setMonedaType] = useState("");
  const [urlImagen, setUrlImagen] = useState(imagenNoDisponible);

  const handleCheckboxChange = (checkboxNumber) => {
    if (checkboxNumber === 1) {
      setIsChecked1(true);
      setIsChecked2(false);
    } else if (checkboxNumber === 2) {
      setIsChecked1(false);
      setIsChecked2(true);
    }
  };

  const handleCheckBox = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      // Si el checkbox se marca, establecer los descuentos en cero
      setDescuentoA(0);
      setDescuentoB(0);
    }
  };

  const handleClientSelect = (cliente) => {
    const diasSinComprar1 = 0; // Los productos sugeridos en este punto tienen 0 días sin comprar
    const diasSinComprar2 = 45; // Los productos sugeridos en este punto tienen 45 días sin comprar
    const diasSinComprar3 = 75; // Los productos sugeridos en este punto tienen 75 días sin comprar
    setSelectedClient(cliente);
    setIsAddToCartVisible(true);
    setIsEditToCartVisible(false);
    setDialogOpen(false);

    getArticulosSugeridos(
    ).then((articuloSugerido) => {
      setArticuloSugerido(articuloSugerido); //Productos sugeridos en donde se eligen los items
    });

    getSugeridosPorClientePorCantidad(
      cliente.codigoCliente,
      diasSinComprar1
    ).then((produtosSugeridosCliente) => {
      setProductosSugeridosCliente(produtosSugeridosCliente); //Productos sugeridos al encontrar un cliente - primera sugerencia
    });

    getSugeridosPorClientePorCantidad(
      cliente.codigoCliente,
      diasSinComprar2
    ).then((articuloSugeridoCliente) => {
      setArticuloSugeridoCliente(articuloSugeridoCliente); //Productos sugeridos en donde se eligen los items
    });
    

    getSugeridosPorClientePorMonto(cliente.codigoCliente, diasSinComprar2).then(
      (articuloSugeridoClientePorMonto) => {
        setArticuloSugeridoClientePorMonto(articuloSugeridoClientePorMonto); //Productos sugeridos en donde se eligen los items
      }
    );

    getSugeridosPorClientePorCantidad(
      cliente.codigoCliente,
      diasSinComprar3
    ).then((articuloSugeridoCliente) => {
      setArticuloSugeridoCliente75(articuloSugeridoCliente); //Productos sugeridos en donde se eligen los items
    });

    getSugeridosPorClientePorMonto(cliente.codigoCliente, diasSinComprar3).then(
      (articuloSugeridoClientePorMonto) => {
        setArticuloSugeridoClientePorMonto75(articuloSugeridoClientePorMonto); //Productos sugeridos en donde se eligen los items
      }
    );
  };

  const handleItemClick = (codigoInterno) => {
    if (codigoInterno) {
      setCodigoSeleccionado(codigoInterno);
      setIsAddToCartVisible(true);
      setIsEditToCartVisible(false);
      fetchData(codigoInterno);
    }
  };

  const handleItemSIClick = (codigoInterno) => {
    if (codigoInterno) {
      setCodigoSeleccionado(codigoInterno);
      setIsAddToCartVisible(true);
      setIsEditToCartVisible(false);
      fetchData(codigoInterno);
      setTabValue(0);
    }
  };

  const totalDecimal = new Decimal(
    parseFloat(total1.toString().replace("$", "").replace("S/", ""))
  );

  const subTotalDecimal = new Decimal(
    parseFloat(totalSubtotal.toString().replace("$", "").replace("S/", ""))
  );

  let totalFinal;
  let subTotalFinal;
  let calculoIGV;
  let totalConvertido;

  totalFinal =
    monedaValue === "SOLES"
      ? "S/ " + totalDecimal.toDecimalPlaces(2).toString()
      : "$ " + totalDecimal.toDecimalPlaces(2).toString();

  subTotalFinal =
    monedaValue === "SOLES"
      ? "S/ " + subTotalDecimal.toDecimalPlaces(2).toString()
      : "$ " + subTotalDecimal.toDecimalPlaces(2).toString();

  calculoIGV =
    monedaValue === "SOLES"
      ? "S/ " +
        totalDecimal.minus(subTotalDecimal).toDecimalPlaces(2).toString()
      : "$ " +
        totalDecimal.minus(subTotalDecimal).toDecimalPlaces(2).toString();

  totalConvertido =
    monedaValue === "SOLES"
      ? "$ " + totalDecimal.dividedBy(moneda).toDecimalPlaces(2).toString()
      : "S/ " + totalDecimal.times(moneda).toDecimalPlaces(2).toString();

  const calcularPrecioFinal = () => {
    if (ticketCount === "") {
      ticketCount === 1;
    }
    const cantidad = ticketCount;
    let precioUnitarioSinIgv = new Decimal(
      isNaN(monto) ? 0 : monto === "" ? 0 : monto
    ); //.dividedBy(cantidad);
    let desc1n = new Decimal(descuentoA);
    desc1n = 1 - desc1n.dividedBy(100);
    let desc2n = new Decimal(descuentoB);
    desc2n = 1 - desc2n.dividedBy(100);
    let precioFinaln = precioUnitarioSinIgv
      .times(desc1n)
      .times(desc2n)
      .times(cantidad)
      .times(1.18)
      .toDecimalPlaces(2);

    if (monedaType !== "") {
      if (monedaValue === "SOLES") {
        if (monedaType !== "SOLES") {
          precioFinaln = precioFinaln.times(moneda).toDecimalPlaces(2);
        }
      } else if (monedaValue === "DOLARES AMERICANOS") {
        if (monedaType !== "DOLARES AMERICANOS") {
          precioFinaln = precioFinaln.dividedBy(moneda).toDecimalPlaces(2);
        }
      }
    } else if (monedaValue === "SOLES") {
      // Si la moneda es diferente de soles, aplica la conversión
      precioFinaln = precioFinaln.times(moneda).toDecimalPlaces(2);
    }

    return precioFinaln;
  };

  const [total, setTotal] = useState(calcularPrecioFinal().toString());

  useEffect(() => {
    setTotal(calcularPrecioFinal());
  }, [
    ticketCount,
    monto,
    descuentoA,
    descuentoB,
    monedaValue,
    moneda,
    tabValue,
  ]);

  const calcularUtilidad = () => {
    // const precioVenta = calcularPrecioFinal();
    const montoDecimal = new Decimal(monto);
    const precioVentaSinIGV = new Decimal(
      monedaValue === "SOLES" ? montoDecimal.dividedBy(moneda) : montoDecimal
    ).dividedBy(ticketCount);
    const precioCompraSinIGV = new Decimal(
      detalleProducto.precioCompra
    ).dividedBy(1.18);
    const utilidad = precioVentaSinIGV
      .minus(precioCompraSinIGV)
      .dividedBy(precioCompraSinIGV)
      .toDecimalPlaces(2);
    return utilidad;
  };

  const calcularUtilidadPorItem = () => {};

  const handleGoToTab1 = (
    codigoInterno,
    precioFinal,
    descuentoA,
    descuentoB,
    ticketCount,
    monto,
    monedaType
  ) => {
    setDescuentoA(descuentoA);
    setDescuentoB(descuentoB);
    setTotal(precioFinal);
    setTicketCount(ticketCount);
    setMonto(monto / ticketCount);
    setMonedaType(monedaType);

    setTabValue(0);
    getProductoSeleccionado(codigoInterno).then((detalleProducto) => {
      setDetalleProducto(detalleProducto);
    });
    if (cartItems.length === 0) {
      setIsEditToCartVisible(false);
    } else {
      setIsEditToCartVisible(true);
    }
  };

  const handleItemsSelect = (productos) => {
    //setSelectedItems(productos);
    setDialogProductOpen(false);
    setIsAddToCartVisible(true);
    setIsEditToCartVisible(false);
    const codigoInterno =
      productos.CodigoInterno || productos.codigoInterno || productos;
    if (codigoInterno) {
      // setSelectedItems(productos);
      setDialogProductOpen(false);
      setCodigoSeleccionado(null);
      fetchData(codigoInterno);
    }

    getFechaLlegadaProductoSeleccionado(productos.CodigoInterno).then(
      (fechaLlegada) => {
        setfechaLlegada(fechaLlegada);
      }
    );

    getListVendedores().then((vendedores) => {
      setVendedores(vendedores);
    });

    getCambioDeMoneda().then((moneda) => {
      setMoneda(moneda);
    });

    getFormaDePago().then((formaPago) => {
      setFormaPago(formaPago);
    });

    getTipoMonedas().then((tipoMoneda) => {
      setTipoMoneda(tipoMoneda);
    });

    getTransportistas().then((transportistas) => {
      setTransportistas(transportistas);
    });

    if (!selectedClient) {
      // Si no hay cliente seleccionado entonces se mostrará el toast
      setToastOpen(true);
      toast.warning(
        "No se mostrará historial de precios ni produtos sugeridos hasta seleccionar a un cliente"
      );
    }
    setTabValue(0);
    setDatosDisponibles(true);
  };

  const fetchData = (codigoInterno) => {
    getProductoSeleccionado(codigoInterno).then((detalleProducto) => {
      setDetalleProducto(detalleProducto);
      const precioVenta = new Decimal(detalleProducto.precioVenta);
      const impuesto = new Decimal(1.18);
      const precioVentaSinIGV = precioVenta.dividedBy(impuesto);
      const precio = Math.round(precioVentaSinIGV.times(100)) / 100;
      //const precio = precioVentaSinIGV.toDecimalPlaces(2);
      setDescuentoA(0);
      setDescuentoB(0);
      setTicketCount(1);
      setMonto(precio);
      setMonedaType("");
    });

    if (!selectedClient) {
    } else {
      getHistorialPrecios(codigoInterno, selectedClient.codigoCliente).then(
        (historialPrecios) => {
          setHistorialPrecios(historialPrecios);
        }
      );
    }
  };

  const handleDescuentoAChange = (event) => {
    const value = event.target.value.trim();
    if (value === "") {
      setDescuentoA(0);
    } else {
      const parsedValue = parseInt(value);
      if (!isNaN(parsedValue) && parsedValue >= 0 && parsedValue <= 100) {
        setDescuentoA(parsedValue);
      }
    }
  };
  const handleDescuentoBChange = (event) => {
    const value = event.target.value.trim();
    if (value === "") {
      setDescuentoB(0);
    } else {
      const parsedValue = parseInt(value);
      if (!isNaN(parsedValue) && parsedValue >= 0 && parsedValue <= 100) {
        setDescuentoB(parsedValue);
      }
    }
  };

  const handleProforma = (event) => {
    const value = event.target.value.trim();
    if (value === "") {
      setNumeroProforma("");
    } else {
      const parsedValue = parseInt(value);
      if (!isNaN(parsedValue) ) {
        setNumeroProforma(parsedValue);
      }
    }
  };

  // const handlPrecioFinalChange = (event) => {
  //   const value = event.target.value.trim();
  //   if (value === "") {
  //     setTotal(0);
  //   } else {
  //     const parsedValue = parseFloat(value);
  //     if (!isNaN(parsedValue) && parsedValue >= 0 ) {
  //       setTotal(parsedValue);
  //     }
  //   };
  // };

  const handlPrecioFinalChange = (event) => {
    const value = event.target.value.trim();
    // Expresión regular para validar números positivos con hasta dos decimales
    const regex = /^(\d+(\.\d{0,2})?|\.\d{1,2})$/; // /^\d+(\.\d{1,2})?$/;
    if (value === "") {
      setTotal(0);
    } else if (regex.test(value)) {
      // Verificar si el valor cumple con el formato requerido
      //const parsedValue = parseFloat(value);
      setTotal(value);
    }
  };

  const handleMontoChange = (event) => {
    const value = event.target.value;
    setMonto(value);
  };

  useEffect(() => {
    const filtrarArticulosSugeridos = () => {
      setArticuloSugerido((prevArticulos) => {
        return prevArticulos.filter((articulo) => {
          return !cartItems.some(
            (item) => item.codigoInterno === articulo.codigoInterno
          );
        });
      });
    };

    filtrarArticulosSugeridos();
  }, [cartItems]);

  useEffect(() => {
    const filtrarArticulosSugeridoCliente = () => {
      setArticuloSugeridoCliente((prevArticulosCliente) => {
        return prevArticulosCliente.filter((articulo) => {
          return !cartItems.some(
            (item) => item.codigoInterno === articulo.codigoInterno
          );
        });
      });
    };

    const filtrarArticulosSugeridoClientePorMonto = () => {
      setArticuloSugeridoClientePorMonto((prevArticulosCliente) => {
        return prevArticulosCliente.filter((articulo) => {
          return !cartItems.some(
            (item) => item.codigoInterno === articulo.codigoInterno
          );
        });
      });
    };

    filtrarArticulosSugeridoCliente();
    filtrarArticulosSugeridoClientePorMonto();
  }, [cartItems]);

  const CalcularPosicion = () => {
    const posiciones = cartItems.map((item, index) => index + 1);
    return posiciones;
  };

  const addToCart = (
    ticketCount,
    detalleProducto,
    descuentoA,
    descuentoB,
    monto,
    precioFinal,
    monedaValue,
    utilidad
  ) => {
    const alreadyInCart = cartItems.some(
      (item) => item.codigoInterno === detalleProducto.codigoInterno
    );
    if (alreadyInCart) {
      setToastOpen(true);
      toast.error("Este artículo ya se encuentra en el carrito");
      return;
    }
    setToastOpen(true);
    toast.success("Artículo agregado al carrito con éxito");
    const monedaType = monedaValue;

    const subTotalItem = new Decimal(
      new Decimal(precioFinal) / new Decimal(1.18)
    ).toDecimalPlaces(2);
    const newItem = {
      product: detalleProducto.descripcionArticulo,
      codigoInterno: detalleProducto.codigoInterno,
      linea: detalleProducto.codigoLinea,
      precioLista: detalleProducto.precioVenta,
      precioCompra: detalleProducto.precioCompra,
      codigoArticulo: detalleProducto.codigoArticulo,
      marca: detalleProducto.descripcionMarca,
      descuentoA: descuentoA,
      descuentoB: descuentoB,
      monto: subTotalItem,
      monedaType: monedaType,
      precioFinal: new Decimal(precioFinal),
      ticketCount: ticketCount,
      utilidad: utilidad,
    };
    setCartItems([...cartItems, newItem]);
  };

  const editCartItem = (
    precioFinal,
    selectedItem,
    utilidad,
    descuentoA,
    descuentoB,
    ticketCount,
    monedaValue
  ) => {
    const alreadyInCartIndex = cartItems.findIndex(
      (item) => item.codigoInterno === selectedItem
    );
    if (alreadyInCartIndex !== -1) {
      // Si el producto ya está en el carrito, actualiza sus detalles
      const updatedCartItems = [...cartItems];
      const monedaType = monedaValue;
      const subTotalItem = new Decimal(
        new Decimal(precioFinal) / new Decimal(1.18)
      ).toDecimalPlaces(2);
      updatedCartItems[alreadyInCartIndex] = {
        ...updatedCartItems[alreadyInCartIndex],
        descuentoA,
        descuentoB,
        monto: subTotalItem,
        monedaType: monedaType,
        precioFinal: new Decimal(precioFinal),
        utilidad,
        ticketCount,
      };

      setCartItems(updatedCartItems);
      setToastOpen(true);
      toast.success("El artículo se ha editado con éxito");
      setTabValue(1);
      setIsAddToCartVisible(true);
      setIsEditToCartVisible(false);
    }
  };

  const removeFromCart = (codigoInterno) => {
    const updatedCartItems = cartItems.filter(
      (item) => item.codigoInterno !== codigoInterno
    );
    setCartItems(updatedCartItems);
    toast.success("El artículo se ha eliminado con éxito");
    setIsEditToCartVisible(false);
    const newCardItems = cartItems.filter(
      (item) => item.codigoInterno !== codigoInterno
    );
    setCartItems(newCardItems);
    const diasSinComprar2 = 45;

    getSugeridosPorClientePorCantidad(
      selectedClient.codigoCliente,
      diasSinComprar2
    ).then((articuloSugeridoCliente) => {
      setArticuloSugeridoCliente(articuloSugeridoCliente); //Productos sugeridos en donde se eligen los items
    });

    getSugeridosPorClientePorMonto(
      selectedClient.codigoCliente,
      diasSinComprar2
    ).then((articuloSugeridoClientePorMonto) => {
      setArticuloSugeridoClientePorMonto(articuloSugeridoClientePorMonto); //Productos sugeridos en donde se eligen los items
    });



    getArticulosSugeridos().then((articuloSugerido) => {
      setArticuloSugerido(articuloSugerido);
    });
  };

  useEffect(() => {
    getRankingClientes().then((dataRanking) => {
      setRanking(dataRanking);
    });

    getListVendedores().then((vendedores) => {
      setVendedores(vendedores);
    });

    getCambioDeMoneda().then((moneda) => {
      setMoneda(moneda);
    });

    getFormaDePago().then((formaPago) => {
      setFormaPago(formaPago);
    });

    getTipoMonedas().then((tipoMoneda) => {
      setTipoMoneda(tipoMoneda);
    });

    getTransportistas().then((transportistas) => {
      setTransportistas(transportistas);
    });

    getArticulosSugeridos().then((articuloSugerido) => {
      setArticuloSugerido(articuloSugerido);
    });

  }, []);

  useEffect(() => {
    if (ranking.length > 0 && selectedClient) {
      const rankingFiltrado = ranking.find(
        (item) => item.CodCliente === selectedClient.codigoCliente
      );
      const rankingClienteSeleccionado = rankingFiltrado
        ? rankingFiltrado.Ranking
        : "S/R";
      setRankingClienteSeleccionado(rankingClienteSeleccionado);
    }
  }, [ranking, selectedClient]);

  const onCambiarFechaGrafica = (arregloFechas) => {
    setFechasGrafica(arregloFechas);
  };

  useEffect(() => {
    if (selectedClient) {
      // Aquí puedes llamar a tus otros métodos que dependen de fechasGrafica
      getDatosVentasPorClientePorAño(
        selectedClient.codigoCliente,
        fechasGrafica[0]
      ).then((dataActual) => {
        setDataGraficaActual(dataActual);
      });

      getDatosVentasPorClientePorAño(
        selectedClient.codigoCliente,
        fechasGrafica[1]
      ).then((dataAnterior) => {
        setDataGraficaAnterior(dataAnterior);
      });
    }
  }, [fechasGrafica]);

  const handleValidarButtonClick = () => {
    const añoActual = new Date().getFullYear();
    const añoAnterior = añoActual - 1;
    setFechasGrafica([añoActual, añoAnterior]);

    const rankingFiltrado = ranking.find(
      (item) => item.CodCliente === selectedClient.codigoCliente
    );

    const rankingClienteSeleccionado = rankingFiltrado
      ? rankingFiltrado.Ranking
      : "S/R";
    setRankingClienteSeleccionado(rankingClienteSeleccionado);

    getDatosVentasPorClientePorAño(
      selectedClient.codigoCliente,
      fechasGrafica[0]
    ).then((dataActual) => {
      setDataGraficaActual(dataActual);
    });

    getDatosVentasPorClientePorAño(
      selectedClient.codigoCliente,
      fechasGrafica[1]
    ).then((dataAnterior) => {
      setDataGraficaAnterior(dataAnterior);
    });

    getUltimosDocumentosCliente(selectedClient.codigoCliente).then(
      (dataDocumentos) => {
        setDataDocumentos(dataDocumentos);
      }
    );

    getPromedioCompraCliente(selectedClient.codigoCliente).then(
      (promedioCompra) => {
        setPromedioCompra(promedioCompra);
      }
    );

    getPromedioItemsCliente(selectedClient.codigoCliente).then(
      (promedioItems) => {
        setPromedioItems(promedioItems);
      }
    );

    getPromedioComprasAlMesCliente(selectedClient.codigoCliente).then(
      (promedioComprasAlMes) => {
        setPromedioComprasAlMes(promedioComprasAlMes);
      }
    );

    getUltimasComprasCliente(selectedClient.codigoCliente).then(
      (ultimasCompras) => {
        setUltimasCompras(ultimasCompras);
      }
    );

    getItemsMasComprados(selectedClient.codigoCliente).then(
      (itemsComprados) => {
        setItemsComprados(itemsComprados);
      }
    );

    //Mantener al último
    setHayDatosDisponibles(true);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dialogOpen && event.target.closest(".MuiDialog-container") === null) {
        setDialogOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [dialogOpen]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        dialogProductOpen &&
        event.target.closest(".MuiDialog-container") === null
      ) {
        setDialogProductOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [dialogProductOpen]);

  const handlProformaClick = () => {
    if (!selectedClient) {
      toast.warning("Seleccione un cliente para guardar la proforma");
    } else if (cartItems.length === 0) {
      toast.warning("Añadir un producto al carrito para guardar la proforma");
    } else {
      const fechaActual = new Date();
      const fechaEmision = new Date(
        fechaActual.getTime() - fechaActual.getTimezoneOffset() * 60000
      ).toISOString();
      const fechaVencimiento = fechaV.toString();
      const codigoMoneda = () => {
        if (monedaValue === "DOLARES AMERICANOS") {
          return "USD";
        } else {
          return "SOL";
        }
      };

      const subTotal = subTotalDecimal.toDecimalPlaces(2);
      const incIGV = totalDecimal.minus(subTotalDecimal).toDecimalPlaces(2);
      const importeTotal = totalDecimal.toDecimalPlaces(2);
      const codCliente = selectedClient.codigoCliente;

      const estado = () => {
        if (isChecked1 === true && isChecked2 === false) {
          return "PFA";
        } else {
          return "EMI";
        }
      };

      const listaDetalle = cartItems.map((item, index) => {
        const subTotalItem =
          monedaValue === "SOLES"
            ? item.monedaType === "SOLES"
              ? new Decimal(item.monto).toDecimalPlaces(2)
              : new Decimal(item.monto).times(moneda).toDecimalPlaces(2)
            : monedaValue === "DOLARES AMERICANOS"
            ? item.monedaType === "DOLARES AMERICANOS"
              ? new Decimal(item.monto).toDecimalPlaces(2)
              : new Decimal(item.monto)
                  .dividedBy(new Decimal(moneda))
                  .toDecimalPlaces(2)
            : 0;

        const precioVentaSinIGV = subTotalItem / ticketCount;
        const precioCompraSinIGV = new Decimal(item.precioCompra)
          .dividedBy(1.18)
          .toDecimalPlaces(2);
        const totalItemConIGV = new Decimal(item.precioFinal).toDecimalPlaces(
          2
        );

        return {
          numeroItem: index + 1,
          codigoInterno: item.codigoInterno,
          cantidad: item.ticketCount,
          precioCompra: precioCompraSinIGV, //item.precioCompra,
          precioLista: item.precioLista,
          precioVenta: precioVentaSinIGV,
          descuentoUno: item.descuentoA,
          descuentoDos: item.descuentoB,
          totalItem: parseFloat(subTotalItem),
          aceptado: item.utilidad > 0.2 ? "S" : "N",
          igvItem: parseFloat(totalItemConIGV),
        };
      });

      setFechaE(fechaEmision);
      postPGenerarProforma(
        fechaEmision,
        listaDetalle,
        vendedor,
        transporte,
        fechaVencimiento,
        cantidad,
        codigoMoneda,
        formaPagos,
        observaciones,
        estado,
        subTotal,
        incIGV,
        importeTotal,
        codCliente
      ).then((numeroProforma) => {
        setNumeroProforma(numeroProforma);
        handleBuscarProforma();
      });
      toast.success("Se ha guardado la proforma con éxito");
    }
  };

  const actualizarProforma = () => {
    if (!proformaSeleccionada) {
      toast.warning("Seleccione una proforma antes de actualizar la proforma");
    } else if (cartItems.length === 0) {
      toast.warning(
        "Añadir al menos un producto al carrito para actualizar la proforma"
      );
    } else {
      const fechaActual = new Date();
      const fechaEmision = new Date(
        fechaActual.getTime() - fechaActual.getTimezoneOffset() * 60000
      ).toISOString();
      const fechaVencimiento = fechaV.toString();
      const codigoMoneda = () => {
        if (monedaValue === "DOLARES AMERICANOS") {
          return "USD";
        } else {
          return "SOL";
        }
      };

      const subTotal = subTotalDecimal.toDecimalPlaces(2);
      const incIGV = totalDecimal.minus(subTotalDecimal).toDecimalPlaces(2);
      const importeTotal = totalDecimal.toDecimalPlaces(2);
      const codCliente = selectedClient.codigoCliente;

      const estado = () => {
        if (isChecked1 === true && isChecked2 === false) {
          return "PFA";
        } else {
          return "EMI";
        }
      };

      const listaDetalle = cartItems.map((item, index) => {
        const subTotalItem =
          monedaValue === "SOLES"
            ? item.monedaType === "SOLES"
              ? new Decimal(item.monto).toDecimalPlaces(2)
              : new Decimal(item.monto).times(moneda).toDecimalPlaces(2)
            : monedaValue === "DOLARES AMERICANOS"
            ? item.monedaType === "DOLARES AMERICANOS"
              ? new Decimal(item.monto).toDecimalPlaces(2)
              : new Decimal(item.monto)
                  .dividedBy(new Decimal(moneda))
                  .toDecimalPlaces(2)
            : 0;

        const precioVentaSinIGV = subTotalItem / ticketCount;
        const precioCompraSinIGV = new Decimal(item.precioCompra)
          .dividedBy(1.18)
          .toDecimalPlaces(2);
        const totalItemConIGV = new Decimal(item.precioFinal).toDecimalPlaces(
          2
        );

        return {
          numeroItem: index + 1,
          codigoInterno: item.codigoInterno,
          cantidad: item.ticketCount,
          precioCompra: precioCompraSinIGV, //item.precioCompra,
          precioLista: item.precioLista,
          precioVenta: precioVentaSinIGV,
          descuentoUno: item.descuentoA,
          descuentoDos: item.descuentoB,
          totalItem: parseFloat(subTotalItem),
          aceptado: item.utilidad > 0.2 ? "S" : "N",
          igvItem: parseFloat(totalItemConIGV),
        };
      });

      setFechaE(fechaEmision);
      putActualizarProforma(
        proformaSeleccionada.numeroProforma,
        fechaEmision,
        listaDetalle,
        vendedor,
        transporte,
        fechaVencimiento,
        cantidad,
        codigoMoneda,
        formaPagos,
        observaciones,
        estado,
        subTotal,
        incIGV,
        importeTotal,
        codCliente
      );
      toast.success("Se ha actualizado la proforma con éxito");
    }
  };

  const handleIconButtonClick = () => {
    setDialogOpen(true);
    if (criterioBusqueda !== "") {
      getClientes(criterioBusqueda).then((tablaClientes) => {
        setClientes(tablaClientes);
      });
      // getArticulosSugeridos().then((articuloSugerido) => {
      //   setArticuloSugerido(articuloSugerido);
      // });
    } else {
      setClientes([]);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleIconButtonItemsClick = () => {
    if (criterio1 === "") {
      // Si el criterio1 está vacío, mostrar el toast
      setToastOpen(true);
      toast.warning("Por favor, ingrese el primer campo");
    } else {
      // Abrir el diálogo y obtener los productos filtrados
      setDialogProductOpen(true);
      getProdutosFiltrados(criterio1, criterio2, criterio3).then(
        (tablaProductos) => {
          setItems(tablaProductos);
        }
      );
    }

    setItems([]);
  };

  const formateFecha = (fechaVencimiento) => {
    const fecha = fechaVencimiento.toString();

    // Parsear la cadena de fecha
    const date = new Date(fecha);

    // Obtener día, mes y año
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    // Formatear la fecha en el formato "dd/mm/yyyy"
    const formattedDate = `${day} - ${month} - ${year}`;
    setDias(formattedDate);
  };

  const hallarVendedorPorCodigo = (codigoVendedor) => {
    const vendedor = vendedores.find(
      (v) => v.codigoVendedor === codigoVendedor
    );
    setVendedor(vendedor);
  };

  const hallarTransportistaPorCodigo = (codigoTransportista) => {
    const transportista = transportistas.find(
      (v) => v.codigoTransportista === codigoTransportista
    );
    setTransporte(transportista);
  };

/*  useEffect(() => {
    // Verifica que 'numeroProforma' no esté vacío
    if (numeroProforma !== "") {
      // Llama a 'handleBuscarProforma' con el nuevo valor de 'numeroProforma'
      handleBuscarProforma(numeroProforma);
    }
  }, [numeroProforma]);*/

  const handleBuscarProforma = (numeroProforma) => {
    if (numeroProforma === "") {
      toast.warning("Por favor, ingrese la proforma");
    } else {
      getSeleccionarProformaCabecera(numeroProforma).then(
        (proformaSeleccionada) => {
          setProformaSeleccionada(proformaSeleccionada);
        }
      );
      setIsAddProformaVisible(false);
      setIsEditProformaVisible(true);
    }
  };

  useEffect(() => {
    if (proformaSeleccionada) {
      getSeleccionarProformaDetalle(numeroProforma).then((proformaDetalle) => {
        setProformaDetalle(proformaDetalle);
      });
    }
  }, [proformaSeleccionada]);

  useEffect(() => {
    if (proformaDetalle.length > 0) {
      //COPIANDO EL CODIGO JAJA

      const clienteProforma = {
        codigoCliente: proformaSeleccionada.codigoClipro,
        tipoDocumento: proformaSeleccionada.tipoDocumentoCliente,
        numDocumento: proformaSeleccionada.numeroDocumentoCliente,
        codigoVendedor: proformaSeleccionada.codigoVendedorCliente,
        razonSocial: proformaSeleccionada.razonSocialCliente,
        direccion: proformaSeleccionada.direccionCliente,
        telefono1: proformaSeleccionada.telefonoUnoCliente,
        telefono2: proformaSeleccionada.telefonoDosCliente,
        celular: proformaSeleccionada.celularCliente,
        correo: proformaSeleccionada.correoCliente,
        estado: proformaSeleccionada.estadoCliente,
      };

      handleClientSelect(clienteProforma);
      //setSelectedClient(clienteProforma);

      setDatosDisponibles(true);
      setTabValue(1);
      handleExpandClick(2);

      const primerItem =
        (proformaDetalle.find((item) => item.numeroItem === 1) ?? {})
          .codigoInterno ?? "000000100018967";

      getHistorialPrecios(primerItem, clienteProforma.codigoCliente).then(
        (historialPrecios) => {
          setHistorialPrecios(historialPrecios);
        }
      );

      setCodigoSeleccionado(primerItem);
      setIsAddToCartVisible(true);
      setIsEditToCartVisible(false);
      fetchData(primerItem);

      getFechaLlegadaProductoSeleccionado(primerItem).then((fechaLlegada) => {
        setfechaLlegada(fechaLlegada);
      });
      getTipoMonedas().then((tipoMoneda) => {
        setTipoMoneda(tipoMoneda);
      });

      const moneda =
        proformaSeleccionada.codigoMoneda === "USD"
          ? "DOLARES AMERICANOS"
          : "SOLES";
      setObservaciones(
        proformaSeleccionada.observacion === null
          ? ""
          : proformaSeleccionada.observacion.toString()
      );
      formateFecha(proformaSeleccionada.fechaVencimiento);
      setMonedaValue(moneda);
      setFormaPagos(
        proformaSeleccionada.codigoFormaPago === "CON"
          ? formaPago[0]
          : proformaSeleccionada.codigoFormaPago === "CRE"
          ? formaPago[1]
          : formaPago[2]
      );

      setCantidad(
        proformaSeleccionada.diasCredito === null
          ? 0
          : proformaSeleccionada.diasCredito
      );
      hallarVendedorPorCodigo(proformaSeleccionada.codigoVendedor);
      hallarTransportistaPorCodigo(proformaSeleccionada.codigoTransportista);
      if (proformaSeleccionada.estado === "EMI") {
        setIsChecked1(false);
        setIsChecked2(true);
      } else {
        setIsChecked1(true);
        setIsChecked2(false);
      }
      let newCartItems = [];
      proformaDetalle.map((item) => {
        const precioVenta = new Decimal(item.precioVenta);
        const precioCompra = item.precioCompra;
        const utilidad = precioVenta
          .minus(precioCompra)
          .dividedBy(precioCompra)
          .toDecimalPlaces(2);
        const monedaType = moneda;

        const newItems = {
          product: item.descripcionArticulo,
          codigoInterno: item.codigoInterno,
          linea: item.codigoLinea,
          precioLista: item.precioLista,
          precioCompra: item.precioCompra,
          codigoArticulo: item.codigoArticulo,
          marca: item.descripcionMarca,
          descuentoA: item.descuentoUno,
          descuentoB: item.descuentoDos,
          monto: item.totalItem,
          monedaType: moneda,
          precioFinal: item.igvItem,
          ticketCount: item.cantidad,
          utilidad: utilidad,
        };
        newCartItems.push(newItems);
      });

      setCartItems(newCartItems);
    }
  }, [proformaDetalle]);

  const handleCloseDialogProduct = () => {
    setDialogProductOpen(false);
  };

  const handleExpandClick = (panel) => {
    setExpandedPanels((prevPanels) => {
      if (prevPanels.includes(panel)) {
        // Si ya está expandido, lo colapsamos solo si no es el único panel abierto
        return prevPanels.length > 1
          ? prevPanels.filter((p) => p !== panel)
          : prevPanels;
      } else {
        // Si no está expandido, colapsamos todos los demás y expandimos el panel actual
        return [panel];
      }
    });
  };

  return (
    <Paper elevation={0}>
      {/* Card Arriba */}
      <Card sx={{ marginLeft: "55px", borderRadius: 0 }}>
        <CardActions
          disableSpacing
          onClick={() => handleExpandClick(1)}
          sx={{
            backgroundColor: expandedPanels.includes(1)
              ? "rgb(12, 55, 100)"
              : "rgb(12, 55, 100)",
            height: "3rem",
          }}
        >
          <Container sx={{ display: "flex", marginLeft: 0 }}>
            <Typography
              style={{
                color: "rgb(255,255,255)",
                fontSize: "1rem",
                fontWeight: "bold",
              }}
            >
              CLIENTE
            </Typography>
            <TextField
              size="small"
              InputProps={{
                style: {
                  backgroundColor: "white",
                  width: "35ch",
                  fontSize: "0.9rem",
                  height: "25px",
                  borderRadius: 0,
                }, // Anula el radio de borde y ajusta el ancho a 35 unidades (caracteres)
              }}
              InputLabelProps={{ style: { color: "rgb(255,255,255)" } }}
              style={{ marginLeft: "10px" }}
              placeholder="Ruc o Razón"
              autoComplete="off"
              onChange={(e) => setCriterioBusqueda(e.target.value)}
              onClick={(event) => {
                event.stopPropagation(); // Evita la propagación del evento al acordeón
              }}
            />
            <IconButton
              style={{
                backgroundColor: "rgb(255, 168, 0)",
                borderRadius: "0",
                marginLeft: "10px",
                height: "25px",
                width: "100px",
              }}
              onClick={(event) => {
                event.stopPropagation(); // Evita la propagación del evento al acordeón
                handleIconButtonClick();
              }}
            >
              <Typography
                style={{
                  color: "rgb(255, 255, 255)",
                  borderRadius: "0",
                  marginLeft: "10px",
                }}
              >
                Buscar
              </Typography>
              <SearchIcon
                style={{ color: "rgb(255, 255, 255)", marginLeft: 4 }}
              />
            </IconButton>
          </Container>
          <Container sx={{ display: "flex", marginLeft: 50 }}>
            <Typography
              style={{
                color: "rgb(255,255,255)",
                fontSize: "1rem",
                fontWeight: "bold",
              }}
            >
              PROFORMA
            </Typography>
            <TextField
              value={numeroProforma}
              size="small"
              InputProps={{
                style: {
                  backgroundColor: "white",
                  width: "25ch",
                  fontSize: "0.9rem",
                  height: "25px",
                  borderRadius: 0,
                }, // Anula el radio de borde y ajusta el ancho a 35 unidades (caracteres)
              }}
              InputLabelProps={{ style: { color: "rgb(255,255,255)" } }}
              style={{ marginLeft: "10px" }}
              placeholder="Num. proforma"
              autoComplete="off"
              onChange={handleProforma}
              onClick={(event) => {
                event.stopPropagation(); // Evita la propagación del evento al acordeón
              }}
            />
            <IconButton
              style={{
                backgroundColor: "rgb(255, 168, 0)",
                borderRadius: "0",
                marginLeft: "10px",
                height: "25px",
                width: "100px",
              }}
              onClick={(event) => {
                event.stopPropagation(); // Evita la propagación del evento al acordeón
                handleBuscarProforma(numeroProforma);
              }}
            >
              <Typography
                style={{
                  color: "rgb(255, 255, 255)",
                  borderRadius: "0",
                  marginLeft: "10px",
                }}
              >
                Buscar
              </Typography>
              <SearchIcon
                style={{ color: "rgb(255, 255, 255)", marginLeft: 4 }}
              />
            </IconButton>
          </Container>
        </CardActions>
        <Collapse in={expandedPanels.includes(1)} timeout="auto" unmountOnExit>
          {/* Contenido del primer card (Cliente) */}
          <Cliente
            cliente={selectedClient}
            dataGraficaActual={dataGraficaActual}
            dataGraficaAnterior={dataGraficaAnterior}
            dataDocumentos={dataDocumentos}
            promedioCompra={promedioCompra}
            promedioItems={promedioItems}
            promedioComprasAlMes={promedioComprasAlMes}
            ranking={rankingClienteSeleccionado}
            ultimasCompras={ultimasCompras}
            itemsComprados={itemsComprados}
            onValidarButtonClick={handleValidarButtonClick}
            onCambiarFechaGrafica={onCambiarFechaGrafica}
            hayDatosDisponibles={hayDatosDisponibles}
            handleBuscarProforma={handleBuscarProforma}
            setNumeroProforma={setNumeroProforma}
          />
        </Collapse>
      </Card>
      <Divider />

      {/* Card al Pie de la Página */}
      <Card
        elevation={0}
        sx={{
          marginLeft: "55px",
          borderRadius: 0,
          marginTop: expandedPanels.includes(1) ? "0px" : 0, // Ajusta el margen superior si el primer card está expandido
        }}
      >
        <CardActions
          disableSpacing
          onClick={() => handleExpandClick(2)}
          sx={{
            height: "3rem",
            width: "100%",
            marginLeft: "0",
            backgroundColor: expandedPanels.includes(2)
              ? "rgb(12, 55, 100)"
              : "rgb(12, 55, 100)",
          }}
        >
          <Container
            maxWidth="sl"
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "left",
            }}
          >
            <Typography
              style={{
                color: "rgb(255,255,255)",
                fontSize: "1rem",
                fontWeight: "bold",
              }}
            >
              ITEMS
            </Typography>
            <TextField
              size="small"
              InputProps={{
                style: {
                  backgroundColor: "white",
                  width: "35ch",
                  fontSize: "0.9rem",
                  borderRadius: 0,
                  height: "25px",
                },
              }}
              autoComplete="off"
              InputLabelProps={{ style: { color: "rgb(255,255,255)" } }}
              style={{ marginLeft: "10px" }}
              placeholder="Código"
              onChange={(e) => setCriterio1(e.target.value)}
              onClick={(event) => {
                event.stopPropagation(); // Evita la propagación del evento al acordeón
              }}
            />
            <TextField
              size="small"
              autoComplete="off"
              InputProps={{
                style: {
                  backgroundColor: "white",
                  fontSize: "0.9rem",
                  height: "25px",
                  borderRadius: 0,
                },
              }}
              InputLabelProps={{ style: { color: "rgb(255,255,255)" } }}
              style={{ marginLeft: "10px" }}
              placeholder="Descripción"
              onChange={(e) => setCriterio2(e.target.value)}
              onClick={(event) => {
                event.stopPropagation(); // Evita la propagación del evento al acordeón
              }}
            />
            <Typography
              style={{
                color: "rgb(255,255,255)",
                fontSize: "1rem",
                marginLeft: "20px",
                fontWeight: "bold",
              }}
            >
              {" "}
              MARCA{" "}
            </Typography>
            <TextField
              size="small"
              autoComplete="off"
              InputProps={{
                style: {
                  backgroundColor: "white",
                  width: "25ch",
                  fontSize: "0.9rem",
                  height: "25px",
                  borderRadius: 0,
                },
              }}
              InputLabelProps={{ style: { color: "rgb(255,255,255)" } }}
              style={{ marginLeft: "10px" }}
              placeholder="Marca - País"
              onChange={(e) => setCriterio3(e.target.value)}
              onClick={(event) => {
                event.stopPropagation(); // Evita la propagación del evento al acordeón
              }}
            />
            <IconButton
              style={{
                backgroundColor: "rgb(255, 168, 0)",
                borderRadius: "0",
                marginLeft: "10px",
                height: "25px",
                width: "100px",
              }}
              onClick={(event) => {
                event.stopPropagation();
                handleIconButtonItemsClick();
              }}
            >
              <Typography
                style={{
                  color: "rgb(255, 255, 255)",
                  borderRadius: "0",
                  marginLeft: "10px",
                }}
              >
                Buscar
              </Typography>
              <SearchIcon
                style={{ color: "rgb(255, 255, 255)", marginLeft: 4 }}
              />
            </IconButton>
          </Container>
        </CardActions>
        <Collapse in={expandedPanels.includes(2)} timeout="auto" unmountOnExit>
          {/* Contenido del segundo card (Items) */}
          <Items
            detalleProducto={detalleProducto}
            fechaLlegada={fechaLlegada}
            datosDisponibles={datosDisponibles}
            addToCart={addToCart}
            editCartItem={editCartItem}
            cartItems={cartItems}
            cartItemsSoles={cartItemsSoles}
            descuentoA={descuentoA}
            handleDescuentoAChange={handleDescuentoAChange}
            descuentoB={descuentoB}
            handleDescuentoBChange={handleDescuentoBChange}
            monto={monto}
            handleMontoChange={handleMontoChange}
            historialPrecios={historialPrecios}
            vendedores={vendedores}
            tipoMoneda={tipoMoneda}
            transportistas={transportistas}
            moneda={moneda}
            formaPago={formaPago}
            ticketCount={ticketCount}
            setTicketCount={setTicketCount}
            monedaValue={monedaValue}
            setMonedaValue={setMonedaValue}
            setCartItems={setCartItems}
            articuloSugeridoCliente={articuloSugeridoCliente}
            articuloSugerido={articuloSugerido}
            articuloSugeridoClientePorMonto={articuloSugeridoClientePorMonto}
            articuloSugeridoCliente75={articuloSugeridoCliente75}
            articuloSugeridoClientePorMonto75={
              articuloSugeridoClientePorMonto75
            }
            removeFromCart={removeFromCart}
            setArticuloSugeridoClientePorMonto={
              setArticuloSugeridoClientePorMonto
            }
            setArticuloSugerido={setArticuloSugerido}
            codigoSeleccionado={codigoSeleccionado}
            setCodigoSeleccionado={setCodigoSeleccionado}
            handleItemClick={handleItemClick}
            vendedor={vendedor}
            setVendedor={setVendedor}
            formaPagos={formaPagos}
            setFormaPagos={setFormaPagos}
            transporte={transporte}
            setTransporte={setTransporte}
            pdfData={pdfData}
            cantidad={cantidad}
            setCantidad={setCantidad}
            dias={dias}
            setDias={setDias}
            observaciones={observaciones}
            setObservaciones={setObservaciones}
            isChecked1={isChecked1}
            isChecked2={isChecked2}
            isChecked={isChecked}
            handleCheckboxChange={handleCheckboxChange}
            handleCheckBox={handleCheckBox}
            tabValue={tabValue}
            setTabValue={setTabValue}
            handleGoToTab1={handleGoToTab1}
            calcularPrecioFinal={calcularPrecioFinal}
            total={total}
            handlPrecioFinalChange={handlPrecioFinalChange}
            calcularUtilidad={calcularUtilidad}
            isAddToCartVisible={isAddToCartVisible}
            isEditToCartVisible={isEditToCartVisible}
            handleItemSIClick={handleItemSIClick}
            handlProformaClick={handlProformaClick}
            totalSubtotal={totalSubtotal}
            setTotalSubtotal={setTotalSubtotal}
            total1={total1}
            setTotal1={setTotal1}
            totalDecimal={totalDecimal}
            totalFinal={totalFinal}
            subTotalFinal={subTotalFinal}
            calculoIGV={calculoIGV}
            fechaV={fechaV}
            setFechaV={setFechaV}
            selectedClient={selectedClient}
            produtosSugeridosCliente={produtosSugeridosCliente}
            handleItemsSelect={handleItemsSelect}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            proformaSeleccionada={proformaSeleccionada}
            totalConvertido={totalConvertido}
            isEditProformaVisible={isEditProformaVisible}
            isAddProformaVisible={isAddProformaVisible}
            actualizarProforma={actualizarProforma}
            urlImagen = {urlImagen}
            setUrlImagen = {setUrlImagen}
          />
        </Collapse>
      </Card>
      <DialogCliente
        clientes={clientes}
        onClientSelect={handleClientSelect}
        open={dialogOpen}
        handleClose={handleCloseDialog}
        onBackdropClick={handleCloseDialog}
      />
      <DialogProductos
        items={items}
        onProductSelect={handleItemsSelect}
        openProduct={dialogProductOpen}
        handleProductClose={handleCloseDialogProduct}
        onBackdropClick={handleCloseDialogProduct}
      />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
    </Paper>
  );
};

export default TuComponente;
