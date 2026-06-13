import { calculateAverageStar } from "@/features/utils/calculateAverageStar";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import React, { useMemo } from "react";
import { Image, Platform, Pressable, Text, View } from "react-native";
import { HandbagResponse } from "../types/handbag.type";

interface Props {
  item: HandbagResponse;
  favoriteIds?: string[];
  toggleFavorite?: (v: string) => void;
  handlePressDetail: (v: string) => void;
}
const isIOS = Platform.OS === "ios";

function HandbagCard({
  item,
  favoriteIds,
  toggleFavorite,
  handlePressDetail,
}: Props) {
  const imageUrl = item.variants.images[0];
  const averageStar = useMemo(
    () => calculateAverageStar(item.feedbacks),
    [item],
  );

  const isFavorite = favoriteIds?.includes(item.id);

  return (
    <Pressable
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      }}
      className="flex-1"
      onPress={() => handlePressDetail(item.id)}
    >
      <View
        style={{ elevation: 2 }}
        className="w-full overflow-hidden bg-white rounded-2xl"
      >
        <View className="relative">
          <Image
            source={{ uri: imageUrl }}
            className="w-full h-40"
            resizeMode="cover"
            accessibilityLabel={item.handbagName}
          />

          <Pressable
            className="absolute p-2 bg-blue-200 rounded-full right-2 top-2"
            onPress={(e) => {
              e.stopPropagation();
              toggleFavorite?.(item.id);
            }}
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

        <View className="gap-2 p-3 py-5">
          <View className="flex-row items-center justify-between ">
            <Text className="uppercase text-[#005CAB] text-sm">
              {item.brand}
            </Text>
            <View className="flex-row items-center gap-1">
              <Text
                className={`font-regular ${isIOS ? "text-[14px]" : "text-[18px]"}`}
              >
                {averageStar}
              </Text>
              <AntDesign name="star" size={isIOS ? 19 : 22} color="orange" />
            </View>
          </View>

          <Text
            numberOfLines={2}
            className={`font-mbold text-base min-h-12 ${isIOS ? "text-sm" : "text-md"}`}
          >
            {item.handbagName}
          </Text>

          <Text className="bg-blue-100 self-start rounded-md px-2 py-1 font-mbold text-xs text-[#005CAB]">
            {item.gender ? "For Women" : "For Men"}
          </Text>

          <Text className="text-md font-mbold text-[#005CAB]">
            ${Math.round(item.cost)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

export default React.memo(HandbagCard);
