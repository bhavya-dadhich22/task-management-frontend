import React from "react";
import "../styles/ConfirmModal.css"; // Make sure to import the CSS file

const ConfirmModal = ({ message, isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null; // Don't render anything if modal isn't open

  return (
    <div className="modal-overlay">
      <div className="modal">
        <p className="modal-message">{message}</p>
        <div className="modal-actions">
          <button className="cancel-button" onClick={onCancel}>
            Cancel
          </button>
          <button className="confirm-button" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
