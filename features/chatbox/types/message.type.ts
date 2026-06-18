import { HandbagResponse } from "@/features/handbags/types/handbag.type";

export interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
  products?: HandbagResponse[];
  isLoading?: boolean;
}

export type AIResponse = {
  message: string;
  products: HandbagResponse[];
};
