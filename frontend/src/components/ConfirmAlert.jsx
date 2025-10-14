import './ConfirmAlert.css';
import { X } from 'lucide-react';

const ConfirmAlert = ({ isOpen, title, message, confirmText, cancelText, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">{title}</h2>
        <p className="modal-message">{message}</p>
        <div className="modal-actions">
          <button onClick={onCancel} className='modal-close-btn' aria-label="Close">
            <X size={20} className="!text-[var(--maroon-700)]" />
          </button>
          <button className="button-secondary" onClick={onCancel}>
            {cancelText}
          </button>
          <button className="button-primary" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmAlert;
