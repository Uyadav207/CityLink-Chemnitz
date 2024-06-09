import { create } from 'zustand';

const useModalStore = create((set) => ({
  isOpen: false,
  modalData: { title: '', message: '', onConfirm: () => {} },
  setIsOpen: (isOpen) => set({ isOpen }),
  setModalData: (title, message, onConfirm) =>
    set({ modalData: { title, message, onConfirm } }),
}));

export default useModalStore;
