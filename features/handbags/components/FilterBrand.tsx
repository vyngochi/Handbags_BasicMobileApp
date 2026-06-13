import { Skeleton } from "moti/skeleton";
import React from "react";
import { FlatList, Pressable, Text, View } from "react-native";

interface Props {
  items: string[] | undefined;
  selectedBrand: string;
  setSelectedBrand: (v: string) => void;
  isLoading: boolean;
}
export default function FilterBrand({
  items,
  selectedBrand,
  setSelectedBrand,
  isLoading,
}: Props) {
  const brands = ["All", ...new Set(items)];

  return isLoading ? (
    <FlatList
      data={[1, 2, 3, 4]}
      keyExtractor={(item) => item.toString()}
      renderItem={() => (
        <View className="flex-row ml-5">
          <Skeleton colorMode="light" width={60} height={40} />
        </View>
      )}
      horizontal
    />
  ) : (
    <FlatList
      data={brands}
      keyExtractor={(item) => item.toString()}
      renderItem={({ item }) => (
        <FilterTagRender
          key={item}
          selectedBrand={selectedBrand}
          setSelectedBrand={setSelectedBrand}
          item={item.toString()}
        />
      )}
      horizontal
    />
  );
}

const FilterTagRender = ({
  item,
  selectedBrand,
  setSelectedBrand,
}: {
  item: string;
  selectedBrand?: string;
  setSelectedBrand?: (v: string) => void;
}) => {
  const isActive = selectedBrand === item;
  return (
    <Pressable onPress={() => setSelectedBrand?.(item)}>
      <View
        className={`flex-row justify-center items-center rounded-2xl p-4 mb-5 mr-2 ${isActive ? "bg-[#005CAB]" : "bg-white"}`}
      >
        <Text
          className={`${isActive ? "text-white font-mbold" : "text-[#005CAB] font-regular"}`}
        >
          {item}
        </Text>
      </View>
    </Pressable>
  );
};
