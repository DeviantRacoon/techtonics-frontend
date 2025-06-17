import { useState, useCallback } from "react";

export function useUserUI() {
  const [showConfirmModal, setShowConfirmModal] = useState({ isOpen: false, title: "", message: "" });
  const [showFormModal, setShowFormModal] = useState({ isOpen: false, isEdit: false, title: "", description: "" });
  const [selected, setSelected] = useState<any>({});

  const handleCreate = useCallback(() => {
    setShowFormModal({
      isOpen: true,
      isEdit: false,
      title: "Agregar usuario",
      description: "Completa el siguiente formulario para crear un nuevo usuario.",
    });
  }, []);

  const handleEdit = useCallback((row: any) => {
    setSelected(row);
    
    setShowFormModal({
      isOpen: true,
      isEdit: true,
      title: "Editar usuario",
      description: "Completa el siguiente formulario para editar el usuario.",
    });
  }, []);

  const handleActive = useCallback((row: any) => {
    setSelected(row);
    setShowConfirmModal({
      isOpen: true,
      title: "Activar usuario",
      message: "¿Estas seguro de activar el usuario?",
    });
  }, []);

  const handleDelete = useCallback((row: any) => {
    setSelected(row);
    setShowConfirmModal({
      isOpen: true,
      title: "Eliminar usuario",
      message: "¿Estas seguro de eliminar el usuario?",
    });
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelected({});
    setShowFormModal({ isOpen: false, isEdit: false, title: "", description: "" });
    setShowConfirmModal({ isOpen: false, title: "", message: "" });
  }, []);

  return {
    selected,
    showConfirmModal,
    showFormModal,
    handleCreate,
    handleEdit,
    handleDelete,
    handleActive,
    handleCloseModal,
  };
}
