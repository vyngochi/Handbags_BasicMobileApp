import { apiServer } from "@/api/client";
import { AIResponse } from "../types/message.type";

export const chatAI = (message: string) => {
  return apiServer.post<AIResponse>("/api/chat", { message });
};
