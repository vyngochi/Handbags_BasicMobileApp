import HandbagCard from "@/features/handbags/components/HandbagCard";
import { useFavorites } from "@/features/handbags/hooks/useFavorites";
import { useRouter } from "expo-router";
import React, { useCallback } from "react";
import { FlatList, Text, View } from "react-native";
import { Message } from "../types/message.type";

export default function AssistantBubble({ text, products }: Message) {
  const router = useRouter();
  const { toggleFavorite } = useFavorites();

  const handlePressDetail = useCallback((id: string) => {
    router.push({ pathname: "/handbag/[id]", params: { id: id } });
  }, []);

  return (
    <View className="mb-6">
      <View className="p-4 border border-gray-300 bg-blue-50 rounded-2xl">
        <Text className="leading-6 font-regular text-[#005CAB]">{text}</Text>
      </View>

      {products && products?.length > 0 && (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          contentContainerStyle={{ paddingHorizontal: 16, marginTop: 16 }}
          renderItem={({ item }) => (
            <View className="w-[48%] mb-4 mt-2">
              <HandbagCard
                item={item}
                handlePressDetail={() => handlePressDetail(item.id)}
                toggleFavorite={toggleFavorite}
              />
            </View>
          )}
        />
      )}
    </View>
  );
}
