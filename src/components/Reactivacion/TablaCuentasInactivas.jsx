import React from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import FilaCuentaInactiva from "./FilaCuentaInactiva";
import LoadingIndicator from "../../Util/LoadingIndicator";
import CenteredContent from "../../Util/CenteredContent";
import { Typography } from "@mui/material";
import CustomScrollTable from "../CustomScrollTable";

const StyledTableHead = styled(TableHead)({
  backgroundColor: "rgb(237, 237, 237)",
  "& th": {
    color: "rgb(90, 90, 90)",
    fontWeight: "bold",
    fontSize: "0.75rem",
    textTransform: "uppercase",
    borderBottom: "1px solid rgba(0,0,0,0.1)",
  },
});

const TablaCuentasInactivas = ({ cuentas, isLoading, searchTriggered, onContactado }) => {
  if (isLoading) {
    return <LoadingIndicator height={300} />;
  }

  if (searchTriggered && cuentas.length === 0) {
    return (
      <CenteredContent>
        <Typography variant="h6" color="text.secondary">
          No se encontraron cuentas inactivas para ese criterio
        </Typography>
      </CenteredContent>
    );
  }

  return (
    <CustomScrollTable style={{ height: "100%" }}>
      <TableContainer>
        <Table size="small" stickyHeader>
          <colgroup>
            <col style={{ width: "22%" }} />
            <col style={{ width: "16%" }} />
            <col style={{ width: "14%" }} />
            <col style={{ width: "12%" }} />
            <col style={{ width: "16%" }} />
            <col style={{ width: "20%" }} />
          </colgroup>
          <StyledTableHead>
            <TableRow>
              <TableCell>Cliente e ID</TableCell>
              <TableCell>Segmento hace 3 meses</TableCell>
              <TableCell>Compras 3 meses</TableCell>
              <TableCell>Días inactivo</TableCell>
              <TableCell>Últimas compras</TableCell>
              <TableCell>Acción</TableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {cuentas.map((cuenta) => (
              <FilaCuentaInactiva key={cuenta.id} cuenta={cuenta} onContactado={onContactado} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </CustomScrollTable>
  );
};

export default TablaCuentasInactivas;
