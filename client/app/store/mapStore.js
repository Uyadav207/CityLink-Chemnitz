import { create } from 'zustand';

const useDataStore = create((set) => ({
  dataApi: null,
  setData: (value) => set(() => ({ dataApi: value })),
}));

export default useDataStore;