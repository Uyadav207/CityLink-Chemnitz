import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useDataStore = create(
  persist(
    (set) => ({
      dataApi: null,
      homeCoords: null,
      setData: (value) => set(() => ({ dataApi: value })),
      setHomeCoords: (value) => set(() => ({ homeCoords: value })),
    }),
    {
      name: 'mapData', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export default useDataStore;
