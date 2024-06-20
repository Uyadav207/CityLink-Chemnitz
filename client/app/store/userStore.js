import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useUserStore = create(
  persist(
    (set) => ({
      userData: '',
      currentCategory: 'SCHULE',
      currentPosition: '',
      selectedFacility: '',
      setUser: (value) => set(() => ({ userData: value })),
      setCurrentCategory: (value) => set(() => ({ currentCategory: value })),
      setCurrentPosition: (value) => set(() => ({ currentPosition: value })),
      setSelectedFacility: (value) => set(() => ({ selectedFacility: value })),
      logout: () =>
        set(
          () => (
            { userData: '' },
            { currentCategory: 'SCHULE' },
            { currentLocation: '' },
            { selectedFacility: '' }
          )
        ),
    }),
    {
      name: 'userData',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useUserStore;
