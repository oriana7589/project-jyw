import { useEffect, useRef, useState } from "react";

/**
 * Calcula cuántas filas de una tabla caben en el espacio vertical disponible
 * dentro de su contenedor, y devuelve una ref para medir + la cantidad de filas.
 *
 * El contenedor de referencia debe ser el elemento que define el límite de altura
 * (normalmente el padre con flex:1 dentro de un layout de altura fija).
 *
 * @param {number} rowHeight - alto aproximado de cada fila en px (compacta = ~37px)
 * @param {number} minRows - mínimo de filas a mostrar, por si el espacio es muy chico
 */
export default function useResponsiveRowsPerPage(rowHeight = 37, minRows = 5) {
  const containerRef = useRef(null);
  const [rowsPerPage, setRowsPerPage] = useState(minRows);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const calcular = () => {
      const alturaDisponible = el.clientHeight;
      const filas = Math.floor(alturaDisponible / rowHeight);
      setRowsPerPage(Math.max(filas, minRows));
    };

    calcular();

    const resizeObserver = new ResizeObserver(() => calcular());
    resizeObserver.observe(el);

    window.addEventListener("resize", calcular);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", calcular);
    };
  }, [rowHeight, minRows]);

  return { containerRef, rowsPerPage };
}
