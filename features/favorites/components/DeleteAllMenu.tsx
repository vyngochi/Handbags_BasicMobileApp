import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";
import { Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  children: React.ReactNode;
  onSelect: () => void;
}
export default function DeleteAllMenu({ children, onSelect }: Props) {
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 4,
    right: 4,
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        className="p-0 border-red-100"
        insets={contentInsets}
        sideOffset={2}
        side="bottom"
        align="center"
      >
        <DropdownMenuLabel onPress={onSelect}>
          <Text className="text-xs text-red-600 font-regular">
            Delete all favorites
          </Text>
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
