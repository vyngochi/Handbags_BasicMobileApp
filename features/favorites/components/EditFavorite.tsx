import { Button } from "@/components/ui/button";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Ellipsis } from "lucide-react-native";
import React, { useEffect } from "react";
import { Pressable, View } from "react-native";
import DeleteAllMenu from "./DeleteAllMenu";

interface Props {
  isDeleteStatus: boolean;
  setIsDeleteStatus: (v: boolean) => void;
  setIsDeleteAll: (v: boolean) => void;
  setDeleteIds: (v: string[]) => void;
}
export default function EditFavorite({
  isDeleteStatus,
  setIsDeleteStatus,
  setIsDeleteAll,
  setDeleteIds,
}: Props) {
  const handleSelect = () => {
    setIsDeleteStatus(false);
    setIsDeleteAll(true);
  };

  useEffect(() => {
    setDeleteIds([]);
  }, [isDeleteStatus]);

  return (
    <Pressable onPress={() => setIsDeleteStatus(!isDeleteStatus)}>
      {isDeleteStatus ? (
        <View className="flex-row items-center gap-2">
          <DeleteAllMenu onSelect={handleSelect}>
            <Button className="w-5 h-5" variant={"outline"}>
              <Ellipsis color={"black"} size={15} />
            </Button>
          </DeleteAllMenu>
          <MaterialCommunityIcons
            name="close-circle-multiple-outline"
            size={24}
            color="#000000"
          />
        </View>
      ) : (
        <AntDesign name="edit" size={24} color="#000000" />
      )}
    </Pressable>
  );
}
