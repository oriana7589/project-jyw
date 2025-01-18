import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import TablePagination from "@mui/material/TablePagination";
import Logo from "../image/logo.png";
import Result from "../image/result.png";
import { Typography } from "@mui/material";
import SquareSharpIcon from '@mui/icons-material/SquareSharp';
import CustomScroll from "./CustomScroll";
import { descripcionCont, descripcionItem, descripItem, itemComp, tableItem, tableItemColum, tableItemsCont } from "../Styles/MenuStyles";
import LoadingIndicator from "../Util/LoadingIndicator";
import NoResults from "../Util/NoResults";

const TableComponent = ({ isLoading,setIsLoading, items, onProductSelect,itemsPerPage }) => {
  const [selectProductos, setSelectedProductos] = useState(null);
  const [highlightedRow, setHighlightedRow] = useState(0);
  const [page, setPage] = useState(0);
  itemsPerPage = 13;

  const handleRowDoubleClick = (datosItems) => {
    setSelectedProductos(datosItems);
    onProductSelect(datosItems);
  };

  const handleMouseEnter = (index) => {
    setHighlightedRow(index);
  };

  const handleMouseLeave = () => {
    setHighlightedRow(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

   useEffect(() => {
      const handleKeyDown = (event) => {
        if (items.length === 0) return; // Evitar manejar eventos si no hay clientes
  
        const visibleItems = items.slice(page * itemsPerPage, (page + 1) * itemsPerPage);
        if (event.key === "ArrowDown") {
          setHighlightedRow((prev) =>
            prev === null || prev === visibleItems.length - 1 ? 0 : prev + 1
          );
        } else if (event.key === "ArrowUp") {
          setHighlightedRow((prev) =>
            prev === null || prev === 0 ? visibleItems.length - 1 : prev - 1
          );
        } else if (event.key === "Enter" && highlightedRow !== null) {
          const selected = visibleItems[highlightedRow];
          setSelectedProductos(selected);
          onProductSelect(selected);
        }
      };
  
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, [items, page, itemsPerPage, highlightedRow, onProductSelect]);

  const handleCellClick = (index) => {
  setExpandedCell(index === expandedCell ? null : index);
};

  return (
    <div
      style={{
        padding: 10,
        overflow: "hidden",
        display: "grid",
        gridTemplateRows: "1fr auto",
        width:1090,
        height: 600,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {isLoading ? ( // Si está cargando, muestra el indicador de carga
         <LoadingIndicator height={300}/>
      ) : items.length > 0 ? (
        <div style={{ width:"100%"}}>
         <div style={{ position: "sticky", top: 0, zIndex: 1 }}>
           <table style={{ borderCollapse: 'collapse', border: 1, borderSpacing:"25px" , marginBottom:10}}>
            <thead style={{ position: "sticky", top: 0, zIndex: 1}} >
              <tr style={{ height: 20 }}>
                <th style={{  ...descripcionItem ,backgroundColor: "rgb(255,17,17)"}}></th>
                <th style={{  ...descripcionCont}}>En travesia</th>
                <th style={{ }}></th>
                <th style={{ ...descripcionItem ,backgroundColor: "rgb(251,255,170)",width:55}}></th>
                <th style={{ ...descripcionCont }}>Local</th>
                <th style={{ width:50}}></th>
                <th style={{ ...descripcionItem ,backgroundColor: "rgb(128,247,60)",width:55}}></th>
                <th style={{ ...descripcionCont, textAlign:"left"}}>Original</th>
                <th style={{ width:50}}></th>
                <th style={{ ...descripcionItem ,backgroundColor: "rgb(255, 168, 0)",width:55}}></th>
                <th style={{ ...descripcionCont }}>Stock Total</th>
                <th style={{ }}></th>
             </tr>
             <tr style={{ height: 8 }}>
                <th style={{  fontSize: "0.9rem"}}></th>
                <th style={{  fontSize: "0.9rem", paddingLeft:5}}></th>
                <th style={{ }}></th>
                <th style={{  fontSize: "0.9rem"}}></th>
                <th style={{  fontSize: "0.9rem", paddingLeft:5}}></th>
                <th style={{ }}></th>
                <th style={{  fontSize: "0.9rem"}}></th>
                <th style={{  fontSize: "0.9rem", paddingLeft:5}}></th>
                <th style={{ }}></th>
                <th style={{  fontSize: "0.9rem"}}></th>
                <th style={{  fontSize: "0.9rem", paddingLeft:5}}></th>
                <th style={{ }}></th>
             </tr>
           </thead>
          <tbody  style={{ height: 20}}>
            <tr>
            <td style={{ fontSize: "0.9rem", paddingBottom:5,backgroundColor: "rgb(179,180,177)",width:55}}></td>
             <td style={{ fontSize: "0.9rem", paddingLeft:5, fontWeight:"bold"}}>Importado</td>
             <td style={{ width:50}}></td>
             <td style={{ fontSize: "0.9rem", paddingBottom:5,backgroundColor: "rgb(227,216,249)",width:55}}></td>
             <td style={{  fontSize: "0.9rem", paddingLeft:5,fontWeight:"bold"}}>Importado</td>
             <td style={{ }}></td>
             <td style={{ fontSize: "0.9rem", paddingBottom:5,backgroundColor: "rgb(29,241,255)",width:55}}></td>
             <td style={{  fontSize: "0.9rem", paddingLeft:5,fontWeight:"bold"}}>Precio Descuento</td>
             <td style={{ }}></td>

            </tr>
             
      </tbody>
    </table>
  </div>

  <div style={{ overflow: "auto", width: 1090,  maxHeight:600 , height:600 }}>
  <table style={{ borderCollapse: 'collapse', width: '100%'}}>
      <thead style={{ position: "sticky", top: 0, zIndex: 1, borderBottom: '1px solid black'}}>
        <tr style={{ height: 20 }}>
            <th style={{...tableItem  }}>  </th>
            <th style={{...tableItem }}></th>
            <th style={{...tableItem}}></th>
            <th style={{...tableItem}}></th>
            <th style={{...tableItem}}></th>
            <th style={{...tableItem}}></th>
            <th style={{...tableItem}}></th>
            <th style={{...tableItem}}></th>
            <th style={{...tableItem}}></th>
            <th style={{...tableItem}}></th>
            <th style={{...tableItemColum, borderLeft:"1px solid black" }}> </th>
            <th style={{...tableItemColum }}> 01 </th>
            <th style={{...tableItemColum  }}>  </th>
            <th style={{...tableItemColum }}> 02 </th>
            <th style={{...tableItemColum}}> T1 </th>
            <th style={{...tableItem }}></th>
          </tr>
          <tr style={{ height: 50 }}>
            <th style={{...tableItemsCont }}>  </th>
            <th style={{...tableItemsCont}}>Línea</th>
            <th style={{...tableItemsCont }}>Cod Articulo</th>
            <th style={{...tableItemsCont  }}>Codint Marca</th>
            <th style={{...tableItemsCont }}>TC</th>
            <th style={{...tableItemsCont }}>Des Articulo</th>
            <th style={{...tableItemsCont}}>Pais</th>
            <th style={{...tableItemsCont }}>Marca</th>
            <th style={{...tableItemsCont }}>P.V</th>
            <th style={{...tableItemsCont }}>P.D</th>
            <th style={{...itemComp }}> P1 </th>
            <th style={{...itemComp  }}> P3 </th>
            <th style={{...itemComp  }}> P4 </th>
            <th style={{...itemComp }}> P1 </th>
            <th style={{...itemComp }}> P1 </th>
            <th style={{...tableItemsCont }}>Total</th>

          </tr>
        </thead>
        <tbody >
          {items .slice(page * itemsPerPage, (page + 1) * itemsPerPage).map((item, index) => (
             <tr
             key={index}
             onMouseEnter={() => handleMouseEnter(index)}
             onMouseLeave={handleMouseLeave}
             onClick={() => handleRowDoubleClick(item)}
             style={{
               backgroundColor:
                 selectProductos === item
                   ? "#333" // Fondo oscuro para la fila seleccionada
                   : highlightedRow === index
                   ? "#555" // Fondo oscuro para la fila destacada
                   : "white", // Fondo blanco para otras filas
               color:
                 selectProductos === item || highlightedRow === index
                   ? "white" // Texto blanco para filas seleccionadas/destacadas
                   : "black", // Texto negro para otras filas
               cursor: "pointer",
             }}
           >
              <td style={{ ...descripItem }}> <SquareSharpIcon style={{ color: item.OrdenCompra === -1 ? "rgb(179,180,177)" : item.OrdenCompra === 1 ? "rgb(128,247,60)" : "rgb(255,17,17)" }} /></td>
              <td style={{ ...descripItem ,paddingLeft:5 }}>{item.CodigoLinea}</td>
              <td style={{...descripItem ,maxWidth: "75px"}}>{item.CodigoArticulo}</td>
              <td style={{...descripItem ,maxWidth: "75px"}}>{item.CodigoInternoMarca}</td>
              <td style={{ ...descripItem,paddingRight:3.5 ,textAlign:"left",paddingLeft:5 , color: "black", background: item.TipoCompra === "ORI" ? "rgb(67,240,42)" : item.TipoCompra === "IMP" ? "rgb(227,216,249)" : item.TipoCompra === "LOC" ? "rgb(251,255,170)" : "rgb(255,255,255)" }}>{item.TipoCompra}</td>
              <td style={{  ...descripItem,paddingLeft:5 ,maxWidth: "315px",}} > <CustomScroll style={{ maxWidth: "315px", whiteSpace: "nowrap" }}>
                {item.DescripcionArticulo}
              </CustomScroll></td>
              <td style={{ ...descripItem,paddingLeft:5,maxWidth:"75px",}}>{item.DescripcionPais}</td>
              <td style={{...descripItem, paddingLeft:5 ,maxWidth:"85px"}}>{item.DescripcionMarca}</td>
              <td style={{...descripItem,paddingLeft:5,  textAlign:"end" }}>{item.PrecioVenta}</td>
              <td style={{ ...descripItem,paddingLeft:5,  textAlign:"end",maxWidth: "55px"  , color: "black", background:"rgb(29,241,255)" }}>{item.PrecioDescuento}</td>
              <td style={{ ...descripItem,textAlign:"end",paddingLeft:6.8 ,maxWidth: "30px" }}>{item.Stock01P1}</td>
              <td style={{ ...descripItem, textAlign:"end",paddingLeft:6.8 ,maxWidth:"30px" }}>{item.Stock01P3}</td>
              <td style={{ ...descripItem,  textAlign:"end" , paddingLeft:6.8 ,maxWidth:"30px" }}>{item.Stock01P4}</td>
              <td style={{ ...descripItem,  textAlign:"end",maxWidth:"30px" }}>{item.Stock02P1}</td>
              <td style={{...descripItem, textAlign:"end", paddingLeft:6.8 ,maxWidth:"30px" }}>{item.StockT1P1}</td>
              <td style={{  ...descripItem,paddingLeft:5  , background:"rgb(29,241,255)", color: "black",  textAlign:"end" }}>{item.StockTotal}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div
            style={{
              position: "sticky",
              bottom: 0,
              backgroundColor: "white",
              zIndex: 1,
            }}
          >
            <TablePagination
              component="div"
              count={items.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={itemsPerPage}
              rowsPerPageOptions={[itemsPerPage]}
            />
          </div>
     </div>  
  </div>
      ) : (
        <NoResults imageSrc={Result}/>
      )}
    </div>
  );
};

export default TableComponent;
