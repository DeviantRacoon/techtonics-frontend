import { useState, useCallback } from "react";

export function useCutOffUI() {
  const [showModalForm, setShowModalForm] = useState({ isOpen: false });
  const [showConfirmModal, setShowConfirmModal] = useState({ isOpen: false, title: "", message: "" });
  const [selected, setSelected] = useState<any>({});

  const handleCreate = useCallback(() => {
    setSelected({});
    setShowModalForm({
      isOpen: true,
    });
  }, []);

  const handleDelete = useCallback((row: any) => {
    setSelected(row);
    setShowConfirmModal({
      isOpen: true,
      title: "Eliminar corte",
      message: "¿Estas seguro de eliminar el corte?",
    });
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelected({});
    setShowConfirmModal({ isOpen: false, title: "", message: "" });
    setShowModalForm({ isOpen: false });
  }, []);

  return {
    selected,
    showConfirmModal,
    showModalForm,
    handleDelete,
    handleCloseModal,
    handleCreate,
  };
}

