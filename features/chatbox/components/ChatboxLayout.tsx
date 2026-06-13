import { useChatStore } from "@/stores/chatbox.store";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, KeyboardAvoidingView, Platform } from "react-native";
import { useChatAI } from "../hooks/useChatAI";
import { useSaveMessages } from "../hooks/useSaveMessages";
import { Message } from "../types/message.type";
import AssistantBubble from "./AssistantBubble";
import ChatInput from "./ChatInput";
import MessageRecommend from "./MessageRecommend";
import UserMessageBubble from "./UserMessageBubble";

export default function ChatboxLayout() {
  const { mutate: send, isPending } = useChatAI();
  const { isDeleteHistory, setIsDeleteHistory } = useChatStore();
  const { setMessagesIntoStore, loadMessages, deleteChatHistory } =
    useSaveMessages();
  const [input, setInput] = useState("");
  const [chatMessages, setChatMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (isDeleteHistory === true) {
      setChatMessages([]);
      deleteChatHistory(setChatMessages);
      setIsDeleteHistory(false);
    }
  }, [isDeleteHistory]);

  useFocusEffect(
    useCallback(() => {
      loadMessages(setChatMessages);
    }, []),
  );

  const handleSendMessage = async (message: Message) => {
    const loadingMessage: Message = {
      id: "loading",
      role: "assistant",
      text: "We are looking handbags for you...",
      isLoading: true,
    };

    setChatMessages((prev) => [...prev, message, loadingMessage]);

    await setMessagesIntoStore(message);

    send(message, {
      onSuccess: async (data) => {
        const assistantMessage: Message = {
          id: Date.now().toString(),
          role: "assistant",
          text: data.message,
          products: data.products,
        };

        setChatMessages((prev) =>
          prev.map((msg) => (msg.id === "loading" ? assistantMessage : msg)),
        );

        await setMessagesIntoStore(message);
      },
      onError: async () => {
        const errorMessage: Message = {
          id: Date.now().toString(),
          role: "assistant",
          text: "Sorry, An error is occurred, please try again later!",
        };

        setChatMessages((prev) =>
          prev.map((msg) => (msg.id === "loading" ? errorMessage : msg)),
        );

        await setMessagesIntoStore(errorMessage);
      },
    });
  };

  const handleSelectRecommend = (rec: string) => {
    let message: Message = {
      id: Date.now().toString(),
      role: "user",
      text: rec,
    };

    handleSendMessage(message);
  };

  const handleChatInput = () => {
    let message: Message = {
      id: Date.now().toString(),
      role: "user",
      text: input,
    };

    setInput("");
    handleSendMessage(message);
  };

  return (
    <KeyboardAvoidingView
      behavior={"padding"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 120 : 100}
      className="flex-1"
    >
      <FlatList
        data={chatMessages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          if (item.role === "user") {
            return <UserMessageBubble text={item.text} />;
          }

          return <AssistantBubble {...item} />;
        }}
        ListEmptyComponent={
          <MessageRecommend
            chatMessages={chatMessages}
            handleSelectRecommend={handleSelectRecommend}
          />
        }
        contentContainerStyle={{
          padding: 16,
        }}
        inverted={false}
        className="flex-1"
      />

      <ChatInput
        input={input}
        setInput={setInput}
        handleChatInput={handleChatInput}
      />
    </KeyboardAvoidingView>
  );
}
