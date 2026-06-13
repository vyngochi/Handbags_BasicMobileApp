import { useRouter } from "expo-router";
import { ChevronLeft, Map } from "lucide-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function DetailHeader() {
  const router = useRouter();
  return (
    <SafeAreaView edges={["top"]} style={{ backgroundColor: "#ffffff" }}>
      <View className="flex-row items-center justify-between px-4 py-4">
        <Pressable
          onPress={() => router.back()}
          className="flex-row items-center gap-2 "
        >
          <ChevronLeft color={"black"} size={28} />
          <Text className="text-xl font-mbold">Detail</Text>
        </Pressable>

        <Pressable>
          <Map size={28} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
