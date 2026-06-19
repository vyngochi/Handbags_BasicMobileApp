import { useGetAllHandbags } from "@/features/handbags/hooks/useGetAllHandbags";
import React from "react";
import { StyleSheet, View } from "react-native";
import BottomSheetMap from "./BottomSheet";
import MapViewStores from "./MapView";

export default function MapLayout() {
  const { data } = useGetAllHandbags();

  return (
    <View style={styles.container}>
      <MapViewStores data={data} />
      <BottomSheetMap data={data} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
