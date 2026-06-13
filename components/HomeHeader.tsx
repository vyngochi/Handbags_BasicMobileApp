import { Image } from "expo-image";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function HomeHeader() {
  return (
    <SafeAreaView edges={["top"]} style={{ backgroundColor: "#ffffff" }}>
      <View className="flex-row items-center justify-between px-4">
        <Image
          style={{
            width: 100,
            height: 70,
          }}
          contentFit="contain"
          source={require("../assets/images/elite-logo.png")}
        />
        <Image
          style={{
            width: 45,
            height: 45,
            borderRadius: 100,
          }}
          contentFit="cover"
          source={require("../assets/images/myavatar.jpg")}
        />
      </View>
    </SafeAreaView>
  );
}
