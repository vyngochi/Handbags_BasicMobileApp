import { create } from "zustand";
export type HandBagStore = {
  isDeleteAll: boolean;
  selectedBrand: string;
  setIsDeleteAll: (v: boolean) => void;
  setSelectedBrand: (v: string) => void;
};

export const useHandbagStore = create<HandBagStore>((set) => ({
  isDeleteAll: false,
  selectedBrand: "All",

  setIsDeleteAll: (state) => set({ isDeleteAll: state }),
  setSelectedBrand: (state) => set({ selectedBrand: state }),
}));
