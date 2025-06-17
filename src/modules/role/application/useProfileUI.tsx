import { useState, useCallback } from "react";

export function useProfileUI() {
  const [showConfirmModal, setShowConfirmModal] = useState({ isOpen: false, title: "", message: "" });
  const [showFormModal, setShowFormModal] = useState({ isOpen: false, isEdit: false, title: "", description: "" });
  const [showRequestModal, setShowRequestModal] = useState<{ isOpen: boolean, isEdit: boolean, title: string, description: string }>({ isOpen: false, isEdit: false, title: "", description: "" });
  const [selected, setSelected] = useState<any>({});

  const handleCreate = useCallback(() => {
    setShowFormModal({
      isOpen: true,
      isEdit: false,
      title: "Agregar rol",
      description: "Completa el siguiente formulario para crear un nuevo rol.",
    });
  }, []);

  const handleEdit = useCallback((row: any) => {
    setSelected(row);

    setShowFormModal({
      isOpen: true,
      isEdit: true,
      title: "Editar perfil",
      description: "Completa el siguiente formulario para editar el perfil.",
    });
  }, []);

  const handleRequestEdit = useCallback((row: any, catalogs: { requests: any[], profileRequest: any[], requestAllowed: any[] }) => {
    setSelected(row);

    setShowRequestModal({
      isOpen: true,
      isEdit: true,
      title: "Editar permisos",
      description: "Completa el siguiente formulario para editar los permisos.",
    });
  }, []);

  const handleDelete = useCallback((row: any) => {
    setSelected(row);
    setShowConfirmModal({
      isOpen: true,
      title: "Eliminar perfil",
      message: "¿Estás seguro de eliminar el perfil?",
    });
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelected({});
    setShowFormModal({ isOpen: false, isEdit: false, title: "", description: "" });
    setShowConfirmModal({ isOpen: false, title: "", message: "" });
    setShowRequestModal({ isOpen: false, isEdit: false, title: "", description: "" });
  }, []);

  return {
    showConfirmModal,
    showFormModal,
    showRequestModal,
    selected,
    handleCreate,
    handleEdit,
    handleRequestEdit,
    handleDelete,
    handleCloseModal,
  };
}
