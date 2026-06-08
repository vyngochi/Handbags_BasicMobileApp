import { ThemedText } from "@/components/themed-text";
import { Skeleton } from "moti/skeleton";
import React from "react";

export default function HomeScreenDescription({
  isFetching,
}: {
  isFetching: boolean;
}) {
  return (
    <ThemedText style={{ fontFamily: "Montserrat-Regular", paddingTop: 10 }}>
      {isFetching ? (
        <Skeleton colorMode="light" width={350} height={20} />
      ) : (
        `The world's most exclusive collection curated for you`
      )}
    </ThemedText>
  );
}
