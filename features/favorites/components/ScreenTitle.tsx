import { ThemedText } from "@/components/themed-text";
import { Skeleton } from "moti/skeleton";
import React from "react";

export default function ScreenTitle({ isFetching }: { isFetching?: boolean }) {
  return (
    <ThemedText
      style={{
        fontSize: 35,
        lineHeight: 50,
        fontFamily: "Montserrat-Bold",
      }}
    >
      {isFetching ? (
        <Skeleton colorMode="light" width={300} height={50} />
      ) : (
        "My Favorites"
      )}
    </ThemedText>
  );
}
