import { HandbagResponse } from "@/features/handbags/types/handbag.type";
import React from "react";
import { FlatList } from "react-native";
import FavoriteCard from "./FavoriteCard";
import FavoriteSkeleton from "./FavoriteSkeleton";
import ListEmptyComponent from "./ListEmptyComponent";

interface Props {
  items: HandbagResponse[] | undefined;
  toggleFavorite: (v: string) => void;
  setDeleteIds: (v: string[]) => void;
  isDeleteStatus: boolean;
  deleteIds: string[];
  isLoading: boolean;
}

export default function FavoriteList({
  items,
  toggleFavorite,
  isDeleteStatus,
  setDeleteIds,
  deleteIds,
  isLoading,
}: Props) {
  if (isLoading) {
    return (
      <FlatList
        data={[1, 2, 3, 4]}
        keyExtractor={(item) => item.toString()}
        renderItem={() => <FavoriteSkeleton />}
        horizontal={false}
        contentContainerStyle={{ gap: 12 }}
        className="px-5"
      />
    );
  }
  return (
    <FlatList
      data={items ?? []}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <FavoriteCard
          deleteIds={deleteIds}
          setDeleteIds={setDeleteIds}
          isDeleteStatus={isDeleteStatus}
          toggleFavorite={toggleFavorite}
          item={item}
          key={item.id}
        />
      )}
      horizontal={false}
      contentContainerStyle={{ gap: 12 }}
      className="px-5"
      ListEmptyComponent={() => <ListEmptyComponent />}
    />
  );
}
