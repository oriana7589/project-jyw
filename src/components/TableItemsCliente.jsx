import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import CustomScrollTable from "./CustomScrollTable";
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "asc"
    ? (a, b) => -descendingComparator(a, b, orderBy)
    : (a, b) => descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "codigoArticulo",
    numeric: true,
    disablePadding: false,
    label: "Cod.",
  },
  {
    id: "descripcion",
    numeric: true,
    disablePadding: false,
    label: "Descripción",
  },
  {
    id: "marca",
    numeric: true,
    disablePadding: false,
    label: "Marca",
  },
  {
    id: "linea",
    numeric: true,
    disablePadding: false,
    label: "Linea",
  },
  {
    id: "cantidad",
    numeric: true,
    disablePadding: false,
    label: "Cantidad",
  },
  {
    id: "total",
    numeric: true,
    disablePadding: false,
    label: "Total",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{
              textAlign: "left",
              padding: "8px",
              fontSize: "0.9rem",
              fontWeight: "bold",
            }}
          >
            {headCell.id == "cantidad" || headCell.id == "total" ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              <div>{headCell.label}</div>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function TableItemsCliente({ isLoading, itemsComprados, itemsPerPage }) {
  const [order, setOrder] = React.useState("desc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  itemsPerPage = 12;
  const [rowsPerPage, setRowsPerPage] = React.useState(itemsPerPage);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "desc";
    setOrder(isAsc ? "asc" : "desc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = ite.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - itemsComprados.length)
      : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(itemsComprados, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage]
  );

  return (
    <div
      style={{
        padding: 10,
        overflow: "hidden",
        display: "grid",
        gridTemplateRows: "1fr auto",
      }}
    > {isLoading ? (
      <LoadingIndicator/>
    ): (
      <div>
        <CustomScrollTable style={{ maxHeight:"calc(100vh - 21.5rem)"}}>
          <TableContainer>
          <Table
            stickyHeader
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={itemsComprados.length}
            />
            <TableBody>
            {visibleRows.length > 0 ? (
              visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow key={row.id}>
                    <TableCell style={{ textAlign: "left", fontSize: "0.8rem" }}>
                      {row.codigoArticulo}
                    </TableCell>
                    <TableCell
                      style={{
                        textAlign: "left",
                        padding: "8px",
                        fontSize: "0.8rem",
                      }}
                    >
                      {row.descripcionArticulo}
                    </TableCell>
                    <TableCell
                      style={{
                        textAlign: "center",
                        padding: "8px",
                        fontSize: "0.8rem",
                      }}
                    >
                      {row.descripcionMarca}
                    </TableCell>
                    <TableCell
                      style={{
                        textAlign: "center",
                        padding: "8px",
                        fontSize: "0.8rem",
                      }}
                    >
                      {row.codigoLinea}
                    </TableCell>
                    <TableCell
                      style={{
                        textAlign: "center",
                        padding: "8px",
                        fontSize: "0.8rem",
                      }}
                    >
                      {row.cantidad}
                    </TableCell>
                    <TableCell
                      style={{
                        textAlign: "center",
                        padding: "8px",
                        fontSize: "0.8rem",
                      }}
                    >
                      {row.total}
                    </TableCell>
                  </TableRow>
                 )})
              ) : (
                // Mostrar mensaje de "No se encontraron clientes" dentro de la tabla
                <TableRow>
                <TableCell
                  colSpan={10} // Combinar las celdas
                  style={{
                    textAlign: "center",
                    fontSize: "1rem",
                    color: "#757575",
                    padding: "20px 0",
                  }}
                >
                  No se encontraron items mas comprados
                </TableCell>
              </TableRow>
            )}
            </TableBody>
          </Table>
        </TableContainer>
          </CustomScrollTable>
     
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
            count={itemsComprados.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={itemsPerPage}
            rowsPerPageOptions={[itemsPerPage]}
          />
        </div>
      </div>
    )}
    
      
    </div>
  );
}
