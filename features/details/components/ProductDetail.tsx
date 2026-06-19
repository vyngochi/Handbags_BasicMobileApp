import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HandbagResponse } from "@/features/handbags/types/handbag.type";
import { useMapStore } from "@/stores/map.store";
import { useRouter } from "expo-router";
import { MapPin } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";
import { Region } from "react-native-maps";
import Feedback from "./Feedback";

interface Props {
  item: HandbagResponse;
}
export default function ProductDetail({ item }: Props) {
  const router = useRouter();
  const { setStoreRegion } = useMapStore();

  const handleOpenMap = (item: HandbagResponse) => {
    const region: Region = {
      latitude: item.coordinates.latitude,
      longitude: item.coordinates.longitude,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    };

    setStoreRegion(region);

    router.push({ pathname: "/(tabs)/stores" });
  };
  return (
    <View className="w-full gap-6 px-5 py-5">
      <View className="gap-4">
        <Text className="text-xl uppercase text-primary">{item.brand}</Text>
        <View className="flex-row items-start justify-between ">
          <Text className="text-2xl line-clamp-2 max-w-60 font-mbold">
            {item.handbagName}
          </Text>
          <Text className="text-2xl font-mbold text-primary">
            ${Math.round(item.cost).toLocaleString()}
          </Text>
        </View>
        <View className="flex-row gap-1">
          <Badge className="bg-blue-50">
            <Text className="font-regular text-primary">
              {item.gender ? "Women" : "Men"}
            </Text>
          </Badge>
          <Badge className="bg-blue-50">
            <Text className="font-regular text-primary">{item.category}</Text>
          </Badge>
        </View>
      </View>

      <View style={{ elevation: 2 }} className="gap-2 p-4 bg-white rounded-xl">
        <Text className="font-mbold">DESCRIPTION</Text>
        <Text className="leading-5 text-justify text-[15px] font-regular">
          {item.description}
        </Text>
      </View>

      <View className="gap-2 p-2 bg-white rounded-lg">
        <View className="flex-row items-center gap-1">
          <MapPin color={"#005CAB"} size={15} />
          <Text className="font-regular text-[#005CAB]">Nearest Store</Text>
        </View>
        <Text className="text-2xl font-mbold">{item.brand}</Text>
        <Text className="text-lg font-regular">{item.coordinates.address}</Text>
        <Button variant={"default"} onPress={() => handleOpenMap(item)}>
          <Text className="text-lg text-white font-mbold">View on map</Text>
        </Button>
      </View>

      <Feedback feedbacks={item.feedbacks} />
    </View>
  );
}
