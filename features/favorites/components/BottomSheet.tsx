import { Button } from "@/components/ui/button";
import { useHandbagStore } from "@/stores/handbagStore";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { useCallback, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  deleteAllFavorites: () => void;
}
const FavoriteBottomSheet = ({ deleteAllFavorites }: Props) => {
  const isDeleteAll = useHandbagStore((state) => state.isDeleteAll);
  const setIsDeleteAll = useHandbagStore((state) => state.setIsDeleteAll);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = ["20%"];

  if (isDeleteAll) {
    bottomSheetModalRef.current?.present();
  } else {
    bottomSheetModalRef.current?.close();
  }

  const onCancel = () => {
    setIsDeleteAll(false);
  };

  const onDelete = () => {
    deleteAllFavorites();
    setIsDeleteAll(false);
  };

  const handleSheetChanges = useCallback((index: number) => {
    console.log(index);

    if (index === -1) {
      setIsDeleteAll(false);
    }
  }, []);

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        index={1}
        snapPoints={snapPoints}
        ref={bottomSheetModalRef}
        onChange={handleSheetChanges}
      >
        <BottomSheetView
          className="w-full h-full"
          style={styles.contentContainer}
        >
          <Text className="text-[15px] mb-5 font-mbold">
            Are you sure to delete all favorites?
          </Text>
          <View className="flex-row justify-between w-full px-10">
            <Button size={"sm"} variant={"outline"} onPressIn={onCancel}>
              <Text className="font-regular">Cancel</Text>
            </Button>
            <Button size={"sm"} variant={"destructive"} onPressIn={onDelete}>
              <Text className="text-white font-regular">Delete</Text>
            </Button>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default FavoriteBottomSheet;
