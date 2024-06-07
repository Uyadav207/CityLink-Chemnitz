import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useUserStore = create(
  persist(
    (set) => ({
      userData: null,
      currentCategory: 'SCHULE',
      setUser: (value) => set(() => ({ userData: value })),
      setCurrentCategory: (value) => set(() => ({ currentCategory: value })),
      logout: () => set({ userData: null }),
    }),
    {
      name: 'userData', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export default useUserStore;
