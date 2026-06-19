import { Region } from "react-native-maps";
import { create } from "zustand";

interface MapStoreTypes {
  isOpenSuggest: boolean;
  setIsOpenSuggest: (v: boolean) => void;

  storeRegion: Region | null;
  setStoreRegion: (v: Region) => void;
}

export const useMapStore = create<MapStoreTypes>((set) => ({
  isOpenSuggest: false,
  storeRegion: null,

  setIsOpenSuggest: (state) => set({ isOpenSuggest: state }),
  setStoreRegion: (state) => set({ storeRegion: state }),
}));
