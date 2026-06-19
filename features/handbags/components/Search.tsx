import { Skeleton } from "moti/skeleton";
import React from "react";
import { TextInput, View } from "react-native";

interface Props {
  searchKey: string;
  setSearchKey: (v: string) => void;
  isFetching: boolean;
}

export default function Search({ searchKey, setSearchKey, isFetching }: Props) {
  return isFetching ? (
    <View className="my-5">
      <Skeleton colorMode="light" width={350} height={50} />
    </View>
  ) : (
    <TextInput
      placeholder="Search handbags ..."
      className="p-4 my-5 bg-white border border-[#ccc] rounded-full shadow-md min-h-15 font-regular"
      value={searchKey}
      onChangeText={setSearchKey}
      clearButtonMode="always"
    />
  );
}
