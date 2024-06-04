import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useUserStore = create(
  persist(
    (set) => ({
      userData: null,
      setUser: (value) => set(() => ({ userData: value })),
      logout: () => set({ userData: null }),
    }),
    {
      name: 'userData', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export default useUserStore;
