import DetailScreen from "@/features/details/components/DetailScreen";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function HandbagDetail() {
  const param = useLocalSearchParams<{ id: string }>();

  return (
    <View className="flex-1 bg-[#F8F9FF]">
      <DetailScreen id={param.id} />
    </View>
  );
}
