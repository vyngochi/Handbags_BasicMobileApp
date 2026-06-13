import ChatboxLayout from "@/features/chatbox/components/ChatboxLayout";
import React from "react";
import { View } from "react-native";

export default function chat() {
  return (
    <View className="flex-1 bg-[#F8F9FF]">
      <ChatboxLayout />
    </View>
  );
}
