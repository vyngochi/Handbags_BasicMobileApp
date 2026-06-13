import { useChatStore } from "@/stores/chatbox.store";
import { Image } from "expo-image";
import { Ellipsis } from "lucide-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function ChatboxHeader() {
  const imageUrl = "./../../../assets/images/myavatar.jpg";
  const { setIsDeleteHistory } = useChatStore();
  return (
    <SafeAreaView edges={["top"]} style={{ backgroundColor: "#ffffff" }}>
      <View className="flex-row items-center justify-between px-4">
        <View className="flex-row items-center justify-center gap-3 py-2">
          <Image
            style={{
              width: 50,
              height: 50,
              borderRadius: 100,
            }}
            source={require(imageUrl)}
            contentFit="cover"
          />

          <View>
            <Text className="font-mbold">Elite AI Assistant</Text>

            <Text className="flex-row items-center justify-center font-regular">
              <View className="w-1.5 h-1.5 bg-green-500 rounded-full" /> Always
              Online
            </Text>
          </View>
        </View>

        <Pressable onPress={() => setIsDeleteHistory(true)}>
          <Ellipsis />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
