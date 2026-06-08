import React from "react";
import { FlatList, Pressable, Text, View } from "react-native";

interface Props {
  items: string[] | undefined;
  selectedBrand: string;
  setSelectedBrand: (v: string) => void;
}
export default function FilterBrand({
  items,
  selectedBrand,
  setSelectedBrand,
}: Props) {
  const brands = ["All", ...new Set(items)];

  return (
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
  selectedBrand: string;
  setSelectedBrand: (v: string) => void;
}) => {
  const isActive = selectedBrand === item;
  return (
    <Pressable onPress={() => setSelectedBrand(item)}>
      <View
        className={`flex-row justify-center items-center rounded-2xl p-4 mb-5 mr-2 ${isActive ? "bg-[#005CAB]" : "bg-white"}`}
      >
        <Text
          className={`${isActive ? "text-white font-bold" : "text-[#005CAB] font-regular"}`}
        >
          {item}
        </Text>
      </View>
    </Pressable>
  );
};
