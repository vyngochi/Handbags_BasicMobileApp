import { useFavorites } from "@/features/handbags/hooks/useFavorites";
import { useGetAllHandbags } from "@/features/handbags/hooks/useGetAllHandbags";
import { useHandbagStore } from "@/stores/handbagStore";
import Feather from "@expo/vector-icons/Feather";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { Pressable, View } from "react-native";
import FavoriteBottomSheet from "./BottomSheet";
import EditFavorite from "./EditFavorite";
import FavoriteList from "./FavoriteList";
import ScreenTitle from "./ScreenTitle";

export default function MyFavorites() {
  const { data } = useGetAllHandbags();
  const {
    favoriteIds,
    loadFavorites,
    toggleFavorite,
    isLoading,
    deleteManyFavorites,
    deleteAllFavorites,
  } = useFavorites();
  const [deleteIds, setDeleteIds] = useState<string[]>([]);
  const [isDeleteStatus, setIsDeleteStatus] = useState(false);
  const handbagStore = useHandbagStore();

  useFocusEffect(
    useCallback(() => {
      loadFavorites();

      return () => {
        setIsDeleteStatus(false);
        handbagStore.setIsDeleteAll(false);
      };
    }, []),
  );

  const listFavoriteItems = data?.filter((item) =>
    favoriteIds.includes(item.id),
  );

  return (
    <View className="relative w-full">
      <View className="flex-row items-center justify-between px-5 py-5">
        <ScreenTitle />
        {favoriteIds.length > 0 && (
          <EditFavorite
            isDeleteStatus={isDeleteStatus}
            setIsDeleteStatus={setIsDeleteStatus}
            setIsDeleteAll={handbagStore.setIsDeleteAll}
            setDeleteIds={setDeleteIds}
          />
        )}
      </View>
      {/* <Search /> */}

      <FavoriteList
        isDeleteStatus={isDeleteStatus}
        deleteIds={deleteIds}
        setDeleteIds={setDeleteIds}
        items={listFavoriteItems}
        toggleFavorite={toggleFavorite}
        isLoading={isLoading}
      />

      {isDeleteStatus && deleteIds.length > 0 && (
        <Pressable
          onPress={() =>
            deleteManyFavorites(deleteIds, setDeleteIds, setIsDeleteStatus)
          }
          className="absolute p-4 bg-red-100 rounded-full bottom-10 right-10"
        >
          <Feather name="trash-2" size={40} color="red" />
        </Pressable>
      )}

      <FavoriteBottomSheet deleteAllFavorites={deleteAllFavorites} />
    </View>
  );
}
