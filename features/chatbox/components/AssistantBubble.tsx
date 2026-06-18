import HandbagCard from "@/features/handbags/components/HandbagCard";
import { useRouter } from "expo-router";
import React, { useCallback } from "react";
import { Text, View } from "react-native";
import { Message } from "../types/message.type";

interface AssistantBubble extends Message {
  favoriteIds?: string[];
  toggleFavorite?: (v: string) => void;
}
export default function AssistantBubble({
  text,
  products,
  favoriteIds,
  toggleFavorite,
}: AssistantBubble) {
  const router = useRouter();

  const handlePressDetail = useCallback((id: string) => {
    router.push({ pathname: "/handbag/[id]", params: { id: id } });
  }, []);

  return (
    <View>
      <View className="p-4 border border-gray-300 bg-blue-50 rounded-2xl">
        <Text className="leading-6 font-mbold text-[#005CAB]">{text}</Text>
      </View>

      {products && products?.length > 0 && (
        <View className="flex-row flex-wrap justify-between mt-4">
          {products.map((item) => (
            <View key={item.id} className="w-[48%]">
              <HandbagCard
                item={item}
                handlePressDetail={() => handlePressDetail(item.id)}
                toggleFavorite={toggleFavorite}
                favoriteIds={favoriteIds}
              />
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
