const ROLES_EXPORTACION_EXCEL = ["Admin", "Marketing"];

/**
 * Devuelve true si el usuario logueado tiene permiso para exportar a Excel.
 * Solo los roles Admin y Marketing pueden hacerlo.
 */
export function puedeExportarExcel() {
  try {
    const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
    const rol = (usuario?.rol || "").toString().trim();
    return ROLES_EXPORTACION_EXCEL.some((r) => r.toLowerCase() === rol.toLowerCase());
  } catch {
    return false;
  }
}

export function stringToColor(string) {
    let hash = 0;
    let i;
  
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = "#";
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
  
    return color;
  }
  
  export function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
        marginBottom: 2,
        width: 35,
        height: 35,
        fontSize: "1em",
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }