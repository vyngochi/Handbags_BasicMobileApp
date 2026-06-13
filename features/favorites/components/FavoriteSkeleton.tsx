import { Skeleton } from "moti/skeleton";
import React from "react";
import { View } from "react-native";

export default function FavoriteSkeleton() {
  return (
    <View className="flex-row items-center gap-4 p-4 bg-white shadow-sm rounded-2xl">
      {/* Khối ảnh bên trái */}
      <View className="overflow-hidden border border-gray-100 rounded-2xl">
        <Skeleton colorMode="light" width={90} height={90} radius={16} />
      </View>

      {/* Khối thông tin bên phải */}
      <View className="justify-between flex-1 h-20 py-1">
        <View className="gap-2">
          {/* Tiêu đề chính */}
          <Skeleton colorMode="light" width="80%" height={16} radius={4} />
          {/* Mô tả phụ */}
          <Skeleton colorMode="light" width="50%" height={12} radius={4} />
        </View>

        {/* Phần tag hoặc giá tiền phía dưới */}
        <Skeleton colorMode="light" width="30%" height={14} radius={4} />
      </View>

      {/* Giả lập nút bấm Favorite (Trái tim) ở góc phải nếu cần */}
      <View className="self-start pt-1">
        <Skeleton colorMode="light" width={24} height={24} radius="round" />
      </View>
    </View>
  );
}
