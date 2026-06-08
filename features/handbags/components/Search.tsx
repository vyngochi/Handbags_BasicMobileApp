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
      className="shadow-md rounded-full bg-white my-5 min-h-15 p-4 font-regular"
      value={searchKey}
      onChangeText={setSearchKey}
    />
  );
}
