import { Checkbox } from "@/components/ui/checkbox";
import { HandbagResponse } from "@/features/handbags/types/handbag.type";
import { cn } from "@/lib/utils";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

interface Props {
  item: HandbagResponse | undefined;
  isFetching?: boolean;
  toggleFavorite: (v: string) => void;
  isDeleteStatus: boolean;
  setDeleteIds: (v: string[]) => void;
  deleteIds: string[];
}
export default function FavoriteCard({
  item,
  isFetching,
  toggleFavorite,
  isDeleteStatus,
  setDeleteIds,
  deleteIds,
}: Props) {
  const router = useRouter();
  const imageUrl = item?.variants.images[0];

  const handleSetDeleteIds = (deleteId: string) => {
    const updated = deleteIds.includes(deleteId)
      ? deleteIds.filter((id) => id !== deleteId)
      : [...deleteIds, deleteId];
    setDeleteIds(updated);
  };

  const onPressItem = (id: string) => {
    if (isDeleteStatus) {
      handleSetDeleteIds(id);
    } else {
      router.push({
        pathname: "/handbag/[id]",
        params: { id: item?.id ?? "" },
      });
    }
  };
  return (
    <Pressable
      onPress={() => onPressItem(item?.id ?? "")}
      style={{
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      }}
      className={cn(
        deleteIds.includes(item?.id ?? "") ? "border border-blue-600" : "",
        "relative flex-row items-center w-full gap-2 p-5 bg-white shadow-md justify-center-center rounded-2xl",
      )}
    >
      <View className={cn(isDeleteStatus ? "" : "hidden")}>
        <Checkbox
          className="justify-center w-5 h-5 rounded-sm"
          checked={deleteIds.includes(item?.id ?? "")}
          onCheckedChange={() => handleSetDeleteIds(item?.id ?? "")}
        />
      </View>
      <Image
        source={{ uri: imageUrl }}
        width={100}
        height={100}
        resizeMode="contain"
        className="border border-gray-100 rounded-2xl"
      />
      <View className="gap-2">
        <Text className="uppercase text-[#005CAB]">{item?.brand}</Text>
        <Text numberOfLines={2} className="max-w-40 font-regular">
          {item?.handbagName}
        </Text>
        <Text className="font-mbold">${item?.cost}</Text>
      </View>
      <Pressable
        onPress={() => toggleFavorite(item?.id || "")}
        className="absolute right-3 top-3"
      >
        <FontAwesome name="heart" size={20} color="#ff0000" />
      </Pressable>
    </Pressable>
  );
}
