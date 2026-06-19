import { useFavorites } from "@/features/handbags/hooks/useFavorites";
import { useChatStore } from "@/stores/chatbox.store";
import * as Crypto from "expo-crypto";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  View,
} from "react-native";
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
  const { favoriteIds, toggleFavorite, loadFavorites } = useFavorites();
  const [input, setInput] = useState("");
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const flatListRef = useRef<FlatList<Message>>(null);

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
      loadFavorites();
    }, []),
  );

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      flatListRef.current?.scrollToEnd({
        animated: true,
      });
    }, 50);

    return () => clearTimeout(timer);
  }, [chatMessages]);

  const handleSendMessage = async (message: Message) => {
    const loadingId = `${message.id}-loading`;

    const loadingMessage: Message = {
      id: loadingId,
      role: "assistant",
      text: "We are looking handbags for you...",
      isLoading: isPending,
    };

    setChatMessages((prev) => [...prev, message, loadingMessage]);

    await setMessagesIntoStore(message);

    send(message, {
      onSuccess: async (data) => {
        const assistantMessage: Message = {
          id: Crypto.randomUUID(),
          role: "assistant",
          text: data.message,
          products: data.products,
        };

        setChatMessages((prev) =>
          prev.map((msg) => (msg.id === loadingId ? assistantMessage : msg)),
        );

        await setMessagesIntoStore(assistantMessage);
      },
      onError: async () => {
        const errorMessage: Message = {
          id: Crypto.randomUUID(),
          role: "assistant",
          text: "Sorry, An error is occurred, please try again later!",
        };

        setChatMessages((prev) =>
          prev.map((msg) => (msg.id === loadingId ? errorMessage : msg)),
        );

        await setMessagesIntoStore(errorMessage);
      },
    });
  };

  const handleSelectRecommend = (rec: string) => {
    let message: Message = {
      id: Crypto.randomUUID(),
      role: "user",
      text: rec,
    };

    handleSendMessage(message);
  };

  const handleChatInput = () => {
    let message: Message = {
      id: Crypto.randomUUID(),
      role: "user",
      text: input,
    };

    setInput("");
    Keyboard.dismiss();
    handleSendMessage(message);
  };

  return (
    <KeyboardAvoidingView
      behavior={"padding"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 115 : 100}
      className="flex-1"
    >
      <FlatList
        data={chatMessages}
        ref={flatListRef}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          if (item.role === "user") {
            return <UserMessageBubble text={item.text} />;
          }

          return (
            <AssistantBubble
              {...item}
              favoriteIds={favoriteIds}
              toggleFavorite={toggleFavorite}
            />
          );
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
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
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
