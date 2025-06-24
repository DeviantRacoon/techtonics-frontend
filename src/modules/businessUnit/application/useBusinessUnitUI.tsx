import { useState, useCallback } from "react";

export function useBusinessUnitUI() {
  const [showModalForm, setShowModalForm] = useState({ isOpen: false, isEdit: false, title: "", description: "" });
  const [showConfirmModal, setShowConfirmModal] = useState({ isOpen: false, title: "", message: "" });
  const [selected, setSelected] = useState<any>({});

  const handleCreate = useCallback(() => {
    setSelected({});
    setShowModalForm({
      isOpen: true,
      isEdit: false,
      title: "Agregar unidad de negocio",
      description: "Completa el siguiente formulario para crear una nueva unidad de negocio.",
    });
  }, []);

  const handleEdit = useCallback((row: any) => {
    setSelected(row);
    setShowModalForm({
      isOpen: true,
      isEdit: true,
      title: "Editar unidad de negocio",
      description: "Completa el siguiente formulario para editar la unidad de negocio.",
    });
  }, []);

  const handleDelete = useCallback((row: any) => {
    setSelected(row);
    setShowConfirmModal({
      isOpen: true,
      title: "Eliminar unidad de negocio",
      message: "¿Estas seguro de eliminar la unidad de negocio?",
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

