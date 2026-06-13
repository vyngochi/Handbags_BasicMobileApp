import React from "react";
import { Text, View } from "react-native";

export default function UserMessageBubble({ text }: { text: string }) {
  return (
    <View className="items-end mb-4">
      <View className="bg-primary px-4 py-3 rounded-3xl max-w-[80%]">
        <Text className="text-white font-mbold">{text}</Text>
      </View>
    </View>
  );
}
