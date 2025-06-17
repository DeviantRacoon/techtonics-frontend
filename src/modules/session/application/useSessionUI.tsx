import { useState, useCallback } from "react";

export function useSessionUI() {
  const [showConfirmModal, setShowConfirmModal] = useState({ isOpen: false, title: "", message: "" });
  const [selected, setSelected] = useState<any>({});

  const handleBan = useCallback((row: any) => {
    setSelected(row);
    setShowConfirmModal({
      isOpen: true,
      title: "Banear usuario",
      message: "¿Estas seguro de banear el usuario?",
    });
  }, []);

  const handleDelete = useCallback((row: any) => {
    setSelected(row);
    setShowConfirmModal({
      isOpen: true,
      title: "Eliminar sesión",
      message: "¿Estas seguro de eliminar la sesión?",
    });
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelected({});
    setShowConfirmModal({ isOpen: false, title: "", message: "" });
  }, []);

  return {
    selected,
    showConfirmModal,
    handleDelete,
    handleBan,
    handleCloseModal,
  };
}
