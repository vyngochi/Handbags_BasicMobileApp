import { useFavorites } from "@/features/handbags/hooks/useFavorites";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { ScrollView, View } from "react-native";
import Toast from "react-native-toast-message";
import { useGetDetailHandbag } from "../hooks/useGetDetail";
import ImageCarousel from "./ImageCarousel";
import ProductDetail from "./ProductDetail";

export default function DetailScreen({ id }: { id: string }) {
  const { data } = useGetDetailHandbag(id);
  const { favoriteIds, toggleFavorite, loadFavorites } = useFavorites();
  const router = useRouter();
  const [isToggle, setIsToggle] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
      return () => setIsToggle(false);
    }, []),
  );

  const isFavorite = favoriteIds.includes(id);

  React.useEffect(() => {
    if (!isToggle) return;
    if (isFavorite) {
      Toast.show({
        type: "success",
        text2: "Item is added to favorites",
        props: {
          actionText: "View",
          onActionPress: () => {
            router.push("/(tabs)/favorites");
          },
        },
      });
    } else {
      Toast.show({
        type: "info",
        text2: "Item is deleted from favorites!",
      });
    }
  }, [isToggle, isFavorite]);

  const handleToggle = (id: string) => {
    toggleFavorite(id);
    setIsToggle(true);
  };

  if (!data) {
    return <View></View>;
  }

  return (
    <ScrollView className="flex-1">
      <ImageCarousel
        variants={data?.variants}
        isFavorite={isFavorite}
        toggleFavorite={() => handleToggle(id)}
      />
      <ProductDetail item={data} />
    </ScrollView>
  );
}
