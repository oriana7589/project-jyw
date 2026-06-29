import { useState, useEffect, useRef, useCallback } from "react";

/**
 * Hook para proteger formularios con cambios sin guardar.
 *
 * @param {boolean} isDirty - true si el formulario tiene cambios sin persistir
 * @param {(dirty: boolean) => void} [onDirtyChange] - opcional; si se provee, se notifica
 *   con `false` apenas el usuario confirma el descarte, para limpiar el estado "dirty"
 *   en el componente padre (evita que quede marcado como sucio aunque ya se descartó).
 * @returns {{
 *   dialogOpen: boolean,
 *   requestNavigation: (onConfirmed: () => void) => void,  // intenta navegar; si hay cambios, abre el diálogo
 *   confirmDiscard: () => void,                              // usuario confirma salir sin guardar
 *   cancelDiscard: () => void,                                // usuario cancela, se queda en el form
 * }}
 *
 * También registra automáticamente un listener de `beforeunload` mientras isDirty es true,
 * para advertir al cerrar la pestaña/ventana del navegador (mensaje genérico del navegador).
 */
export default function useUnsavedChangesGuard(isDirty, onDirtyChange) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const pendingActionRef = useRef(null);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isDirty) {
        event.preventDefault();
        event.returnValue = "";
        return "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  const requestNavigation = useCallback(
    (onConfirmed) => {
      if (isDirty) {
        pendingActionRef.current = onConfirmed;
        setDialogOpen(true);
      } else {
        onConfirmed();
      }
    },
    [isDirty]
  );

  const confirmDiscard = useCallback(() => {
    setDialogOpen(false);
    onDirtyChange && onDirtyChange(false);
    const action = pendingActionRef.current;
    pendingActionRef.current = null;
    if (action) action();
  }, [onDirtyChange]);

  const cancelDiscard = useCallback(() => {
    setDialogOpen(false);
    pendingActionRef.current = null;
  }, []);

  return { dialogOpen, requestNavigation, confirmDiscard, cancelDiscard };
}
