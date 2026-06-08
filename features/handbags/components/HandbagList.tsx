import React from "react";
import { FlatList, View } from "react-native";
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
        />
      )}
      ListEmptyComponent={() => <View />}
      scrollEnabled={false}
      numColumns={2}
      horizontal={false}
      columnWrapperStyle={{
        gap: 12,
      }}
      contentContainerStyle={{ gap: 12 }}
    />
  );
}
