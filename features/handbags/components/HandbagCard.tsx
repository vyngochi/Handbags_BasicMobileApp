import { calculateAverageStar } from "@/features/utils/calculateAverageStar";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import React, { useMemo } from "react";
import { Image, Platform, Pressable, Text, View } from "react-native";
import { HandbagResponse } from "../types/handbag.type";

interface Props {
  item: HandbagResponse;
  favoriteIds: string[];
  toggleFavorite: (v: string) => void;
}
const isIOS = Platform.OS === "ios";

function HandbagCard({ item, favoriteIds, toggleFavorite }: Props) {
  const imageUrl = item.variants?.[0]?.images?.[0];
  const averageStar = useMemo(() => calculateAverageStar(item), [item]);

  const isFavorite = favoriteIds.includes(item.id);

  return (
    <View className="flex-1">
      <View
        style={{ elevation: 3 }}
        className="w-full  overflow-hidden rounded-2xl bg-white"
      >
        <View className="relative">
          <Image
            source={{ uri: imageUrl }}
            className="w-full h-50"
            resizeMode="cover"
            accessibilityLabel={item.handbagName}
          />

          <Pressable
            className="absolute right-2 top-2 p-2 bg-blue-200 rounded-full"
            onPress={() => toggleFavorite(item.id)}
          >
            <View>
              {!isFavorite ? (
                <FontAwesome name="heart-o" size={20} color="white" />
              ) : (
                <FontAwesome name="heart" size={20} color="#ff0000" />
              )}
            </View>
          </Pressable>
        </View>

        <View className="py-5 p-3 gap-2">
          <View className="flex-row items-center justify-between ">
            <Text className="uppercase text-[#005CAB] text-sm">
              {item.brand}
            </Text>
            <View className="flex-row items-center gap-1">
              <Text
                style={{ fontFamily: "Montserrat-Regular" }}
                className={`${isIOS ? "text-[14px]" : "text-[18px]"}`}
              >
                {averageStar}
              </Text>
              <AntDesign name="star" size={isIOS ? 19 : 22} color="orange" />
            </View>
          </View>

          <Text
            numberOfLines={2}
            className={`font-bold text-base min-h-12 ${isIOS ? "text-sm" : "text-md"}`}
          >
            {item.handbagName}
          </Text>

          <Text className="bg-blue-100 self-start rounded-md px-2 py-1 font-bold text-xs text-[#005CAB]">
            {item.gender ? "For Women" : "For Men"}
          </Text>

          <Text className="text-md font-bold text-[#005CAB]">
            ${Math.round(item.cost)}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default React.memo(HandbagCard);
