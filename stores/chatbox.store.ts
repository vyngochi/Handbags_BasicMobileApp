import { create } from "zustand";

interface ChatStoreType {
  isDeleteHistory: boolean;
  setIsDeleteHistory: (v: boolean) => void;
}
export const useChatStore = create<ChatStoreType>((set) => ({
  isDeleteHistory: false,

  setIsDeleteHistory: (state) => set({ isDeleteHistory: state }),
}));
