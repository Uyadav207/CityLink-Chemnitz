import { create } from 'zustand';

const useUserStore = create((set) => ({
  userData: null,
  setUser: (value) => set(() => ({ userData: value })),
  logout: () => set({ userData: null }),
}));

export default useUserStore;