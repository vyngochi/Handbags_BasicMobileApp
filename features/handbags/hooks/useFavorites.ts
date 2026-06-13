import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

export const useFavorites = () => {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadFavorites = async () => {
    setIsLoading(true);
    try {
      const data = await AsyncStorage.getItem("favorites");
      setFavoriteIds(data ? JSON.parse(data) : []);
    } catch (error) {
      console.error("Load favorite errors: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFavorite = async (id: string) => {
    try {
      const updated = favoriteIds.includes(id)
        ? favoriteIds.filter((itemId) => itemId !== id)
        : [...favoriteIds, id];
      setFavoriteIds(updated);

      await AsyncStorage.setItem("favorites", JSON.stringify(updated));
    } catch (error) {
      console.error("Toggle favorite errors: ", error);
    }
  };

  const deleteManyFavorites = async (
    ids: string[],
    callback: (v: string[]) => void,
    callback2: (v: boolean) => void,
  ) => {
    try {
      const updated = favoriteIds.filter((itemId) => !ids.includes(itemId));

      setFavoriteIds(updated);

      callback([]);
      callback2(false);

      await AsyncStorage.setItem("favorites", JSON.stringify(updated));
    } catch (error) {
      console.error("Delete many favorite errors: ", error);
    }
  };

  const deleteAllFavorites = async () => {
    try {
      setFavoriteIds([]);
      await AsyncStorage.removeItem("favorites");
    } catch (error) {
      console.error("Delete all favorite errors: ", error);
    }
  };

  return {
    favoriteIds,
    setFavoriteIds,
    loadFavorites,
    toggleFavorite,
    deleteManyFavorites,
    deleteAllFavorites,
    isLoading,
  };
};
