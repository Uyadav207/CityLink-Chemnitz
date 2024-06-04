import { create } from 'zustand';

const useDataStore = create((set) => ({
  dataApi: null,
  homeCoords: null,
  setData: (value) => set(() => ({ dataApi: value })),
  setHomeCoords: (value) => set(() => ({ homeCoords: value })),
}));

export default useDataStore;