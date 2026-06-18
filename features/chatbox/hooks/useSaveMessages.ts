import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { Message } from "../types/message.type";

export const useSaveMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadMessages = async (callback: any) => {
    try {
      const data = await AsyncStorage.getItem("messages");

      const parsedMessages = data ? JSON.parse(data) : [];

      setMessages(parsedMessages);

      if (typeof callback === "function") {
        callback(parsedMessages);
      }
    } catch (error) {
      console.log("Get messages from storage failed with error: " + error);
    }
  };

  const setMessagesIntoStore = async (message: Message) => {
    try {
      const data = await AsyncStorage.getItem("messages");
      const currentMessages: Message[] = data ? JSON.parse(data) : [];

      const updated = [...currentMessages, message];

      setMessages(updated);

      await AsyncStorage.setItem("messages", JSON.stringify(updated));
    } catch (error) {
      console.log("Set message into storage failed with error: " + error);
    }
  };

  const deleteChatHistory = async (callback: any) => {
    try {
      await AsyncStorage.removeItem("messages");

      if (typeof callback === "function") {
        callback([]);
      }
    } catch (error) {
      console.log("Deleting message from storage failed with error: " + error);
    }
  };

  return { messages, loadMessages, setMessagesIntoStore, deleteChatHistory };
};
