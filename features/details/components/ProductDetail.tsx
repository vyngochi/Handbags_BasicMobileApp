import { Badge } from "@/components/ui/badge";
import { HandbagResponse } from "@/features/handbags/types/handbag.type";
import React from "react";
import { Text, View } from "react-native";
import Feedback from "./Feedback";

interface Props {
  item: HandbagResponse;
}
export default function ProductDetail({ item }: Props) {
  return (
    <View className="w-full gap-6 px-5 py-5">
      <View className="gap-4">
        <Text className="text-xl uppercase text-primary">{item.brand}</Text>
        <View className="flex-row items-start justify-between ">
          <Text className="text-2xl line-clamp-2 max-w-60 font-mbold">
            {item.handbagName}
          </Text>
          <Text className="text-2xl font-mbold text-primary">
            ${Math.round(item.cost).toLocaleString()}
          </Text>
        </View>
        <View className="flex-row gap-1">
          <Badge className="bg-blue-50">
            <Text className="font-regular text-primary">
              {item.gender ? "Women" : "Men"}
            </Text>
          </Badge>
          <Badge className="bg-blue-50">
            <Text className="font-regular text-primary">{item.category}</Text>
          </Badge>
        </View>
      </View>

      <View style={{ elevation: 2 }} className="gap-2 p-4 bg-white rounded-xl">
        <Text className="font-mbold">DESCRIPTION</Text>
        <Text className="leading-5 text-justify text-[15px] font-regular">
          {item.description}
        </Text>
      </View>

      <Feedback feedbacks={item.feedbacks} />
    </View>
  );
}
