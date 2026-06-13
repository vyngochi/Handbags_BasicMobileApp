import { HandbagResponse } from "@/features/handbags/types/handbag.type";

export type Message = {
  id: string;
  role: "user" | "assistant";
  text: string;
  products?: HandbagResponse[];
  isLoading?: boolean;
};

export type AIResponse = {
  message: string;
  products: HandbagResponse[];
};
