import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

export const useFavorites = () => {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  const loadFavorites = async () => {
    try {
      const data = await AsyncStorage.getItem("favorites");
      setFavoriteIds(data ? JSON.parse(data) : []);
    } catch (error) {
      console.error("Load favorite errors: ", error);
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

  return {
    favoriteIds,
    setFavoriteIds,
    loadFavorites,
    toggleFavorite,
  };
};
