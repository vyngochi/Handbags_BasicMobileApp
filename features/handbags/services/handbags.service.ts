import { api } from "@/api/client";
import { HandbagResponse } from "../types/handbag.type";

export const getAllHandBags = () => {
  return api.get<HandbagResponse[]>("/handbags");
};
