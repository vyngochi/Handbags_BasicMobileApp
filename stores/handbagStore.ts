import { create } from "zustand";
export type HandBagStore = {
  isDeleteAll: boolean;
  setIsDeleteAll: (v: boolean) => void;
};

export const useHandbagStore = create<HandBagStore>((set) => ({
  isDeleteAll: false,

  setIsDeleteAll: (state) => set({ isDeleteAll: state }),
}));
