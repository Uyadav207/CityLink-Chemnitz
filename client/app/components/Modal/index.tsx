import React from 'react';

const Modal = ({ info, isModalOpen, onClose }) => {
  return (
    isModalOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-8 rounded-lg">
          <h2>Attributes:</h2>
          {Object.entries(info).map(([key, value]) => (
            <p key={key}>
              <strong>{key}:</strong> {value}
            </p>
          ))}
          <button className="btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    )
  );
};

export default Modal;
