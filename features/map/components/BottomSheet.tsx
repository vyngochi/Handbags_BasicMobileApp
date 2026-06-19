import { Button } from "@/components/ui/button";
import { HandbagResponse } from "@/features/handbags/types/handbag.type";
import { useHandbagStore } from "@/stores/handbagStore";
import { useMapStore } from "@/stores/map.store";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import { Navigation, ShoppingBag } from "lucide-react-native";
import React, { useCallback, useEffect, useRef } from "react";
import { Text, View } from "react-native";
import { Region } from "react-native-maps";

interface BottomSheetProps {
  data: HandbagResponse[] | undefined;
}
export default function BottomSheetMap({ data }: BottomSheetProps) {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { setSelectedBrand } = useHandbagStore();
  const mapStore = useMapStore();
  const router = useRouter();

  if (mapStore.isOpenSuggest) {
    bottomSheetRef.current?.snapToIndex(0);
  } else {
    bottomSheetRef.current?.close();
  }

  if (!data || data.length === 0) {
    return null;
  }

  useEffect(() => {
    bottomSheetRef.current?.expand();
  }, [data]);

  const snapPoints = ["30%", "50%"];

  const groupByCoordinates = data.reduce(
    (acc, item) => {
      const key = JSON.stringify(item.coordinates.address);
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    },
    {} as Record<string, HandbagResponse[]>,
  );

  const stores = Object.values(groupByCoordinates).map((items) => items[0]);

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      mapStore.setIsOpenSuggest(false);
    }
  }, []);

  const handleViewProducts = useCallback((selectedBrand: string) => {
    setSelectedBrand(selectedBrand);
    router.push({
      pathname: "/(tabs)",
    });
  }, []);

  return (
    <BottomSheet
      index={0}
      snapPoints={snapPoints}
      ref={bottomSheetRef}
      onChange={handleSheetChanges}
      enableDynamicSizing={false}
      backgroundStyle={{
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
      }}
      enablePanDownToClose
    >
      <View className="px-5">
        <Text className="text-lg uppercase font-regular text-[#005CAB]">
          Nearby
        </Text>
        <Text className="text-3xl font-mbold">{`${stores.length} stores near you`}</Text>
      </View>

      <BottomSheetScrollView className="p-5">
        <View className="gap-2 pb-10">
          {stores.map((item, index) => (
            <StoreCard
              key={index}
              item={item}
              onNavigate={mapStore.setStoreRegion}
              onViewProducts={handleViewProducts}
            />
          ))}
        </View>
      </BottomSheetScrollView>
    </BottomSheet>
  );
}

const StoreCard = ({
  item,
  onNavigate,
  onViewProducts,
}: {
  item: HandbagResponse | undefined;
  onNavigate: (v: Region) => void;
  onViewProducts: (v: string) => void;
}) => {
  const storeRegion: Region = {
    latitude: item?.coordinates.latitude!,
    longitude: item?.coordinates.longitude!,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };
  return (
    <View className="gap-4 p-2 border-2 border-white rounded-3xl bg-[#0075D6]">
      <Text className="text-2xl text-white font-mbold">{item?.brand}</Text>
      <Text className="text-[18px] font-regular text-white">
        {item?.coordinates.address}
      </Text>
      <View className="flex-row justify-between">
        <Button className="bg-white" onPress={() => onNavigate(storeRegion)}>
          <Navigation size={24} color={"#005CAB"} />
          <Text className="text-[#005CAB] font-regular">Navigate</Text>
        </Button>
        <Button
          className="bg-white"
          onPress={() => onViewProducts(item?.brand!)}
        >
          <ShoppingBag size={24} color={"#005CAB"} />
          <Text className="text-[#005CAB] font-regular">View Products</Text>
        </Button>
      </View>
    </View>
  );
};
