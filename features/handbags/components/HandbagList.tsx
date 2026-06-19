import { useRouter } from "expo-router";
import { PackageX } from "lucide-react-native";
import React, { useCallback } from "react";
import { FlatList, Text, View } from "react-native";
import { HandbagResponse } from "../types/handbag.type";
import HandbagCard from "./HandbagCard";
import HandbagSkeleton from "./HandbagCardSkeleton";

export default function HandbagList({
  items,
  favoriteIds,
  toggleFavorite,
  isLoading,
}: {
  items: HandbagResponse[] | undefined;
  favoriteIds: string[];
  toggleFavorite: (v: string) => void;
  isLoading: boolean;
}) {
  const router = useRouter();

  const handlePressDetail = useCallback((id: string) => {
    router.push({ pathname: "/handbag/[id]", params: { id: id } });
  }, []);

  return isLoading ? (
    <FlatList
      data={[1, 2, 3, 4]}
      keyExtractor={(item) => item.toString()}
      renderItem={() => <HandbagSkeleton />}
      scrollEnabled={false}
      numColumns={2}
      horizontal={false}
      columnWrapperStyle={{
        gap: 12,
      }}
      contentContainerStyle={{ gap: 12 }}
      className="flex-1"
    />
  ) : (
    <FlatList
      data={items ?? []}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <HandbagCard
          favoriteIds={favoriteIds}
          toggleFavorite={toggleFavorite}
          item={item}
          handlePressDetail={handlePressDetail}
        />
      )}
      ListEmptyComponent={
        <View className="items-center flex-1 gap-2 mt-20">
          <PackageX size={50} color={"#005CAB"} />
          <Text className="font-regular text-[#005CAB]">
            There is no items in this filter
          </Text>
        </View>
      }
      scrollEnabled={false}
      numColumns={2}
      horizontal={false}
      columnWrapperStyle={{
        gap: 12,
      }}
      contentContainerStyle={{ gap: 12 }}
      className="px-1 pb-10"
    />
  );
}
