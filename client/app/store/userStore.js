import { create } from 'zustand';

const useUserStore = create((set) => ({
  userData: null,
  setUser: (userData) => set({ userData }),
  logout: () => set({ userData: null }),
}));

export default useUserStore;
