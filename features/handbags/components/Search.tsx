import React from "react";
import { TextInput } from "react-native";

interface Props {
  searchKey: string;
  setSearchKey: (v: string) => void;
}

export default function Search({ searchKey, setSearchKey }: Props) {
  return (
    <TextInput
      placeholder="Search handbags ..."
      className="shadow-md rounded-full bg-white my-5 min-h-15 p-4 font-regular"
      value={searchKey}
      onChangeText={setSearchKey}
    />
  );
}
