import React, { useEffect, useState } from "react";
import { Select, TextField, MenuItem, Typography, Paper, InputAdornment } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getArticuloMarca,
  postCrearArticuloMarca,
  putModificarArticuloMarca,
} from "../../../Services/ApiService";
import ActionSaveBotton from "../../../Util/ActionSaveBotton";
import ConfirmDiscardDialog from "../../../Util/ConfirmDiscardDialog";
import useUnsavedChangesGuard from "../../../Util/useUnsavedChangesGuard";
import { styleSelect, textStyles } from "../../../Styles/MenuStyles";

const ESTADOS = [
  { value: "ACT", label: "ACTIVO" },
  { value: "INA", label: "INACTIVO" },
];

function EditarArticuloMarca({ selectProducto, articuloSeleccionado, marcas, paises, setTabValue, onGuardado, onDirtyChange }) {
  const esEdicion = Boolean(selectProducto?.codInterno);

  // Datos del producto
  const [codArticulo, setCodArticulo] = useState("");
  const [desArticuloBase, setDesArticuloBase] = useState("");
  const [codMarca, setCodMarca] = useState("");
  const [codPais, setCodPais] = useState("");
  const [codintMarca, setCodintMarca] = useState("");
  const [observacion, setObservacion] = useState("");
  const [estado, setEstado] = useState("ACT");
  const [precioCompra, setPrecioCompra] = useState("");
  const [precioVenta, setPrecioVenta] = useState("");

  // Snapshot del registro tal cual vino del backend, para comparar cambios
  const [valoresIniciales, setValoresIniciales] = useState({
    codMarca: "",
    codPais: "",
    codintMarca: "",
    observacion: "",
    estado: "ACT",
    precioCompra: "",
    precioVenta: "",
  });

  const isDirty = esEdicion
    ? codMarca !== valoresIniciales.codMarca ||
      codPais !== valoresIniciales.codPais ||
      codintMarca !== valoresIniciales.codintMarca ||
      observacion !== valoresIniciales.observacion ||
      estado !== valoresIniciales.estado ||
      precioCompra !== valoresIniciales.precioCompra ||
      precioVenta !== valoresIniciales.precioVenta
    : Boolean(codMarca || codPais || codintMarca || observacion || precioCompra !== "0" || precioVenta !== "0");

  const { dialogOpen, requestNavigation, confirmDiscard, cancelDiscard } =
    useUnsavedChangesGuard(isDirty, onDirtyChange);

  useEffect(() => {
    if (esEdicion) {
      getArticuloMarca(selectProducto.codInterno).then((data) => {
        setCodArticulo(data.codArticulo || "");
        setDesArticuloBase(data.desArticuloBase || "");
        setCodMarca(data.codMarca || "");
        setCodPais(data.codPais || "");
        setCodintMarca(data.codintMarca || "");
        setObservacion(data.observacion || "");
        setEstado(data.estado || "ACT");
        const pCompra = data.precioCompra != null ? String(data.precioCompra) : "0";
        const pVenta = data.precioVenta != null ? String(data.precioVenta) : "0";
        setPrecioCompra(pCompra);
        setPrecioVenta(pVenta);

        setValoresIniciales({
          codMarca: data.codMarca || "",
          codPais: data.codPais || "",
          codintMarca: data.codintMarca || "",
          observacion: data.observacion || "",
          estado: data.estado || "ACT",
          precioCompra: pCompra,
          precioVenta: pVenta,
        });
      });
    } else {
      // Creación: el artículo viene fijo de la selección hecha en la pestaña Artículo
      setCodArticulo(articuloSeleccionado?.codArticulo || "");
      setDesArticuloBase(articuloSeleccionado?.desArticulo || "");
      setCodMarca("");
      setCodPais("");
      setCodintMarca("");
      setObservacion("");
      setEstado("ACT");
      setPrecioCompra("0");
      setPrecioVenta("0");
    }
  }, [selectProducto, articuloSeleccionado]);

  useEffect(() => {
    onDirtyChange && onDirtyChange(isDirty);
  }, [isDirty, onDirtyChange]);

  // Valida números positivos con hasta dos decimales (mismo criterio usado en el resto del sistema)
  const filtroDecimales = (decimal) => {
    const regex = /^(\d+(\.\d{0,2})?|\.\d{1,2})$/;
    if (decimal === "") {
      return "";
    } else if (regex.test(decimal)) {
      return decimal;
    }
  };

  // Mantiene el valor anterior si el nuevo no es válido, para que el campo no quede vacío al teclear
  const sanitizarDecimal = (valorNuevo, valorAnterior) => {
    const resultado = filtroDecimales(valorNuevo);
    return resultado !== undefined ? resultado : valorAnterior;
  };

  const handleSubmit = async () => {
    if (!esEdicion && !articuloSeleccionado) {
      toast.error("Debe seleccionar un artículo en la pestaña Artículo.");
      return;
    }
    if (!codPais) {
      toast.error("El país es requerido.");
      return;
    }
    if (!codMarca) {
      toast.error("La marca es requerida.");
      return;
    }

    // Sanitizar numéricos: nunca mandar "" en precio_compra/precio_venta
    const precioCompraNum = precioCompra === "" || isNaN(parseFloat(precioCompra)) ? 0 : parseFloat(precioCompra);
    const precioVentaNum = precioVenta === "" || isNaN(parseFloat(precioVenta)) ? 0 : parseFloat(precioVenta);

    try {
      if (esEdicion) {
        await putModificarArticuloMarca(selectProducto.codInterno, {
          codPais,
          codMarca,
          codintMarca: codintMarca || null,
          observacion: observacion || null,
          estado,
          precioCompra: precioCompraNum,
          precioVenta: precioVentaNum,
        });
        toast.success("Producto modificado correctamente");
      } else {
        const resultado = await postCrearArticuloMarca({
          codLinea: articuloSeleccionado.codLinea,
          codArticulo: articuloSeleccionado.codArticulo,
          codPais,
          codMarca,
          codintMarca: codintMarca || null,
          observacion: observacion || null,
          estado,
          precioCompra: precioCompraNum,
          precioVenta: precioVentaNum,
        });
        toast.success(`Marca asignada correctamente. Código interno: ${resultado}`);
      }
      onDirtyChange && onDirtyChange(false);
      onGuardado && onGuardado();
      setTabValue(0);
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  const handleBack = () => {
    requestNavigation(() => setTabValue(0));
  };

  return (
    <div style={{ width: "100%", paddingTop: 10 }}>
      <div style={{ overflow: "auto" }}>
        <div style={{ width: "100%", display: "flex", paddingTop: 5 }}>
          <Paper
            elevation={3}
            style={{
              margin: "10px",
              padding: "10px",
              display: "flex",
              width: "100%",
              flexDirection: "column",
              backgroundColor: "rgb(251, 251, 251)",
            }}
          >
            <ActionSaveBotton
              onBackClick={handleBack}
              onSubmitClick={handleSubmit}
              submitLabel={esEdicion ? "Guardar marca" : "Asignar marca"}
              backIconStyle={{ backgroundColor: "rgb(237, 237, 237)" }}
              submitButtonStyle={{ backgroundColor: "rgb(226, 52, 48)" }}
              submitLabelStyle={{ fontSize: "16px" }}
              baseButtonStyle={{ height: "35px", width: "180px" }}
            />

            <div style={{ marginLeft: 10, marginRight: 10 }}>
              <Typography style={{ paddingBottom: 5 }}>
                <strong>{esEdicion ? "DATOS DE LA MARCA" : "ASIGNAR MARCA AL ARTÍCULO"}</strong>
              </Typography>

              <div style={{ display: "flex", paddingBottom: 10 }}>
                <div style={{ flex: "1 1 30%" }}>
                  <Typography style={{ fontWeight: "bold" }}>Cód. Artículo</Typography>
                  <TextField
                    value={codArticulo}
                    fullWidth
                    disabled
                    style={{ height: 35, backgroundColor: "rgb(240,240,240)" }}
                    variant="outlined"
                    InputProps={{ style: { ...textStyles } }}
                  />
                </div>
                <div style={{ flex: "1 1 70%", paddingLeft: 10 }}>
                  <Typography style={{ fontWeight: "bold" }}>Descripción del Artículo</Typography>
                  <TextField
                    value={desArticuloBase}
                    fullWidth
                    disabled
                    style={{ height: 35, backgroundColor: "rgb(240,240,240)" }}
                    variant="outlined"
                    InputProps={{ style: { ...textStyles } }}
                  />
                </div>
              </div>

              <div style={{ display: "flex" }}>
                <div style={{ flex: "1 1 25%" }}>
                  <Typography style={{ fontWeight: "bold" }}>Marca</Typography>
                  <Select
                    value={
                      marcas.some((m) => m.codMarca === codMarca)
                        ? codMarca
                        : ""
                    }
                    onChange={(e) => setCodMarca(e.target.value)}
                    sx={{ ...styleSelect }}
                    displayEmpty
                  >
                    <MenuItem value="" disabled>
                      Seleccione una marca
                    </MenuItem>
                    {marcas.map((m) => (
                      <MenuItem key={m.codMarca} value={m.codMarca}>
                        {m.desMarca}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
                <div style={{ flex: "1 1 25%", paddingLeft: 10 }}>
                  <Typography style={{ fontWeight: "bold" }}>País</Typography>
                  <Select
                    value={codPais}
                    onChange={(e) => setCodPais(e.target.value)}
                    sx={{ ...styleSelect }}
                  >
                    {paises.map((p) => (
                      <MenuItem key={p.codigoPais} value={p.codigoPais}>
                        {p.descripcionPais}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
                <div style={{ flex: "1 1 25%", paddingLeft: 10 }}>
                  <Typography style={{ fontWeight: "bold" }}>Tipo Compra</Typography>
                  <Select value="LOC" disabled sx={{ ...styleSelect }}>
                    <MenuItem value="LOC">LOCAL</MenuItem>
                  </Select>
                </div>
                <div style={{ flex: "1 1 25%", paddingLeft: 10 }}>
                  <Typography style={{ fontWeight: "bold" }}>Estado</Typography>
                  <Select
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}
                    sx={{ ...styleSelect }}
                  >
                    {ESTADOS.map((e) => (
                      <MenuItem key={e.value} value={e.value}>
                        {e.label}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </div>

              <div style={{ display: "flex", paddingTop: 10 }}>
                <div style={{ flex: "1 1 25%" }}>
                  <Typography style={{ fontWeight: "bold" }}>Código Importador</Typography>
                  <TextField
                    value={codintMarca}
                    fullWidth
                    autoComplete="off"
                    onChange={(e) => setCodintMarca(e.target.value)}
                    style={{ height: 35, backgroundColor: "rgb(255,255,255)" }}
                    variant="outlined"
                    inputProps={{ maxLength: 15 }}
                    InputProps={{ style: { ...textStyles } }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", paddingTop: 10 }}>
                <div style={{ flex: "1 1 100%" }}>
                  <Typography style={{ fontWeight: "bold" }}>Observación</Typography>
                  <TextField
                    value={observacion}
                    fullWidth
                    multiline
                    rows={2}
                    autoComplete="off"
                    onChange={(e) => setObservacion(e.target.value)}
                    style={{ backgroundColor: "rgb(255,255,255)" }}
                    variant="outlined"
                    inputProps={{ maxLength: 255 }}
                  />
                </div>
              </div>

              {/* Precios: USD, se seleccionan al enfocar para reemplazar el 0 directamente */}
              <div style={{ display: "flex", paddingTop: 10 }}>
                <div style={{ flex: "1 1 25%" }}>
                  <Typography style={{ fontWeight: "bold" }}>Precio Compra</Typography>
                  <TextField
                    value={precioCompra}
                    fullWidth
                    autoComplete="off"
                    onChange={(e) => setPrecioCompra(sanitizarDecimal(e.target.value, precioCompra))}
                    onFocus={(e) => e.target.select()}
                    onBlur={() => setPrecioCompra((prev) => (prev === "" ? "0" : prev))}
                    style={{ height: 35, backgroundColor: "rgb(255,255,255)" }}
                    variant="outlined"
                    InputProps={{
                      style: { ...textStyles },
                      startAdornment: (
                        <InputAdornment position="start">
                          <span style={{ color: "rgb(150,150,150)", fontSize: "0.8rem", fontWeight: "bold" }}>
                            USD
                          </span>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                <div style={{ flex: "1 1 25%", paddingLeft: 10 }}>
                  <Typography style={{ fontWeight: "bold" }}>Precio Venta</Typography>
                  <TextField
                    value={precioVenta}
                    fullWidth
                    autoComplete="off"
                    onChange={(e) => setPrecioVenta(sanitizarDecimal(e.target.value, precioVenta))}
                    onFocus={(e) => e.target.select()}
                    onBlur={() => setPrecioVenta((prev) => (prev === "" ? "0" : prev))}
                    style={{ height: 35, backgroundColor: "rgb(255,255,255)" }}
                    variant="outlined"
                    InputProps={{
                      style: { ...textStyles },
                      startAdornment: (
                        <InputAdornment position="start">
                          <span style={{ color: "rgb(150,150,150)", fontSize: "0.8rem", fontWeight: "bold" }}>
                            USD
                          </span>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
              </div>
            </div>
          </Paper>
        </div>
      </div>

      <ConfirmDiscardDialog
        open={dialogOpen}
        onCancel={cancelDiscard}
        onConfirm={confirmDiscard}
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
      />
    </div>
  );
}

export default EditarArticuloMarca;
