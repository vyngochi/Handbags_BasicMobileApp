import React from "react";
import { FlatList, View } from "react-native";
import { HandbagResponse } from "../types/handbag.type";
import HandbagCard from "./HandbagCard";

export default function HandbagList({
  items,
  favoriteIds,
  toggleFavorite,
}: {
  items: HandbagResponse[] | undefined;
  favoriteIds: string[];
  toggleFavorite: (v: string) => void;
}) {
  return (
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
