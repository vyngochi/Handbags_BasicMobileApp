import MyFavorites from "@/features/favorites/components/MyFavoritesLayout";
import React from "react";
import { View } from "react-native";

export default function favorites() {
  return (
    <View className="flex-1 flex-row bg-[#F8F9FF]">
      <MyFavorites />
    </View>
  );
}
