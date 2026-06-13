import { useMutation } from "@tanstack/react-query";
import { chatAI } from "../services/chatai.service";
import { Message } from "../types/message.type";

export const useChatAI = () => {
  return useMutation({
    mutationFn: async (message: Message) => {
      const response = await chatAI(message.text);
      return response.data;
    },
  });
};
