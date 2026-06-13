import { api } from "@/api/client";
import { HandbagResponse } from "@/features/handbags/types/handbag.type";

export const getDetailHandBag = (id: string) => {
  return api.get<HandbagResponse>(`/handbags/${id}`);
};
