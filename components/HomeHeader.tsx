import { Image } from "expo-image";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function HomeHeader() {
  return (
    <SafeAreaView edges={["top"]} style={{ backgroundColor: "#ffffff" }}>
      <View className="h-20 flex-row justify-between items-center px-4">
        <Image
          style={{
            width: 100,
            height: 35,
            resizeMode: "contain",
          }}
          source={require("../assets/images/elite-logo.png")}
        />
        <Image
          style={{
            width: 45,
            height: 45,
            borderRadius: 100,
            resizeMode: "cover",
          }}
          source={require("../assets/images/myavatar.jpg")}
        />
      </View>
    </SafeAreaView>
  );
}

export function HomeHeaderRight() {
  return (
    <View>
      <Text>Home Header</Text>
    </View>
  );
}
