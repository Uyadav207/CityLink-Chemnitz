'use client';
import React from 'react';
import useModalStore from '@/app/store/modalStore';

const Modal: React.FC = () => {
  const { isOpen, modalData, setIsOpen } = useModalStore();
  const { title, message, onConfirm } = modalData;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <p className="mb-6">{message}</p>
        <div className="flex justify-end">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded"
            onClick={() => {
              onConfirm();
              setIsOpen(false);
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
