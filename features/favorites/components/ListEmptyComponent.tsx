import { Button } from "@/components/ui/button";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";

export default function ListEmptyComponent() {
  const router = useRouter();
  return (
    <View className="relative items-center justify-center mt-20">
      <Image
        className="w-96 h-96"
        source={require("./../../../assets/images/empty-favorites.png")}
        resizeMode="contain"
      />
      <Button
        variant={"default"}
        className="border-[#005CAB] border absolute bottom-5"
        onPress={() => router.push("/")}
      >
        <Text className="text-white font-mbold">Explore now!</Text>
      </Button>
    </View>
  );
}
