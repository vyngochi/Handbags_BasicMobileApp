import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { RefreshControl, ScrollView } from "react-native";
import { useFavorites } from "../hooks/useFavorites";
import { useGetAllHandbags } from "../hooks/useGetAllHandbags";
import FilterBrand from "./FilterBrand";
import HandbagList from "./HandbagList";
import HomeScreenDescription from "./HomeScreenDescription";
import HomeScreenTitle from "./HomeScreenTitle";
import Search from "./Search";

export default function HomeScreenLayout() {
  const [searchKey, setSearchKey] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const { data, refetch, isFetching } = useGetAllHandbags();
  const { favoriteIds, toggleFavorite, loadFavorites } = useFavorites();

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, []),
  );

  const BRANDS = data?.map((item) => item.brand);

  let handbagDataFiltered = data?.filter((item) =>
    selectedBrand === "All" ? data : item.brand === selectedBrand,
  );

  if (searchKey) {
    handbagDataFiltered = handbagDataFiltered?.filter((item) =>
      item.handbagName.includes(searchKey),
    );
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl onRefresh={refetch} refreshing={isFetching} />
      }
      style={{ padding: 20 }}
    >
      <HomeScreenTitle isFetching={isFetching} />
      <HomeScreenDescription isFetching={isFetching} />
      <Search
        isFetching={isFetching}
        searchKey={searchKey}
        setSearchKey={setSearchKey}
      />
      <FilterBrand
        items={BRANDS}
        selectedBrand={selectedBrand}
        setSelectedBrand={setSelectedBrand}
        isLoading={isFetching}
      />
      <HandbagList
        favoriteIds={favoriteIds}
        toggleFavorite={toggleFavorite}
        items={handbagDataFiltered}
        isLoading={isFetching}
      />
    </ScrollView>
  );
}
