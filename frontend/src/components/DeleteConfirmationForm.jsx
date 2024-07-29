import React from "react";

const DeleteConfirmationForm = ({
  isDeleting,
  context,
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-lg font-bold mb-4">Confirmar eliminación</h2>
        <p className="mb-4">{context}</p>
        <div className="flex justify-end gap-4">
          <button className="btn bg-gray-300" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn btn-error text-white" onClick={onConfirm}>
            {isDeleting ? "Eliminando..." : "Eliminar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationForm;
