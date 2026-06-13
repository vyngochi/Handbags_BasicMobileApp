import HomeScreenLayout from "@/features/handbags/components/HomeScreenLayout";
import { StyleSheet, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.titleContainer}>
      <HomeScreenLayout />
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    flexDirection: "row",
    // gap: 8,
    backgroundColor: "#F8F9FF",
  },
});
