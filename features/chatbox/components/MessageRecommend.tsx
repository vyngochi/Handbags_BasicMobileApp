import { Bot, Gem, Handbag, ShoppingBag } from "lucide-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { Message } from "../types/message.type";

const Messages: { icon: React.ReactNode; message: string }[] = [
  {
    icon: <ShoppingBag color={"#005CAB"} />,
    message: "Recommend a handbag under $500",
  },
  { icon: <Handbag color={"#005CAB"} />, message: "Luxury handbags for work" },
  { icon: <Gem color={"#005CAB"} />, message: "Find Bvlgari handbags" },
];

interface Props {
  chatMessages: Message[];
  handleSelectRecommend: (v: string) => void;
}
export default function MessageRecommend({
  chatMessages,
  handleSelectRecommend,
}: Props) {
  if (chatMessages.length > 0) {
    return <View></View>;
  }
  return (
    <View className="items-center justify-center gap-5 p-6 rounded-xl">
      <View className="p-5 mr-4 bg-blue-100 rounded-full">
        <Bot color={"#005CAB"} size={30} />
      </View>

      <Text className="mb-1 text-lg text-gray-800 font-mbold">
        Hello, I am Elite AI
      </Text>
      <Text className="text-sm leading-5 text-center text-gray-600 font-regular">
        "Ask me about handbags and nearby stores. I can find the perfect piece
        for your collection."
      </Text>

      <View className="w-full gap-4">
        {Messages.map((item, index) => (
          <Pressable
            key={index}
            onPress={() => handleSelectRecommend(item.message)}
            className="flex-row items-center gap-2 p-5 bg-white rounded-lg"
          >
            <View>{item.icon}</View>
            <Text className="font-regular">{item.message}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
