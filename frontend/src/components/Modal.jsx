import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={onClose}
          ></div>
          <div className="relative min-w-[500px] bg-white p-6 rounded-lg z-50 max-w-3xl mx-auto">
            <button
              className="btn btn-sm btn-error text-white btn-circle absolute right-2 top-2"
              onClick={onClose}
            >
              ✕
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
