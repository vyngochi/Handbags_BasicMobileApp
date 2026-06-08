import { ThemedText } from "@/components/themed-text";
import React from "react";

export default function HomeScreenTitle() {
  return (
    <ThemedText
      style={{
        fontSize: 35,
        lineHeight: 50,
        fontFamily: "Montserrat-Bold",
      }}
    >
      Discover Luxury Handbags
    </ThemedText>
  );
}
