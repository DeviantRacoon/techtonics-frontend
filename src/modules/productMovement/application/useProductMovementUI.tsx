import { useState, useCallback } from "react";

export function useProductMovementUI() {
  const [showModalForm, setShowModalForm] = useState({ isOpen: false, isEdit: false, title: "", description: "" });
  const [showConfirmModal, setShowConfirmModal] = useState({ isOpen: false, title: "", message: "" });
  const [selected, setSelected] = useState<any>({});

  const handleCreate = useCallback(() => {
    setSelected({});
    setShowModalForm({
      isOpen: true,
      isEdit: false,
      title: "Agregar movimiento de producto",
      description: "Completa el siguiente formulario para crear un nuevo movimiento de producto.",
    });
  }, []);

  const handleEdit = useCallback((row: any) => {
    setSelected(row);
    setShowModalForm({
      isOpen: true,
      isEdit: true,
      title: "Editar movimiento de producto",
      description: "Completa el siguiente formulario para editar el movimiento de producto.",
    });
  }, []);

  const handleDelete = useCallback((row: any) => {
    setSelected(row);
    setShowConfirmModal({
      isOpen: true,
      title: "Eliminar movimiento de producto",
      message: "¿Estas seguro de eliminar el movimiento de producto?",
    });
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelected({});
    setShowConfirmModal({ isOpen: false, title: "", message: "" });
    setShowModalForm({ isOpen: false, isEdit: false, title: "", description: "" });
  }, []);

  return {
    selected,
    showConfirmModal,
    showModalForm,
    handleDelete,
    handleCloseModal,
    handleCreate,
    handleEdit
  };
}

