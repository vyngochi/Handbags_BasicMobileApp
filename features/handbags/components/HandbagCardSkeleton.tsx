import { Skeleton } from "moti/skeleton";
import { View } from "react-native";

export default function HandbagSkeleton() {
  return (
    <View className="flex-1 bg-white rounded-2xl p-3 mt-5">
      <Skeleton colorMode="light" width={"100%"} height={200} />

      <View className="mt-3">
        <Skeleton colorMode="light" width={100} height={16} />
      </View>

      <View className="mt-2">
        <Skeleton colorMode="light" width={"90%"} height={20} />
      </View>

      <View className="mt-3">
        <Skeleton colorMode="light" width={80} height={24} radius="round" />
      </View>
    </View>
  );
}
