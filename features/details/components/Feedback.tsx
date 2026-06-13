import { calculateAverageStar } from "@/features/utils/calculateAverageStar";
import { formatMemberName } from "@/features/utils/formatMemberName";
import { getRandomMember } from "@/features/utils/randomMember";
import React, { useMemo } from "react";
import { Image, Text, View } from "react-native";
import { StarRatingDisplay } from "react-native-star-rating-widget";

interface Props {
  feedbacks: {
    user: string;
    rating: number;
    comment: string;
  }[];
}
export default function Feedback({ feedbacks }: Props) {
  const averageStar = useMemo(
    () => calculateAverageStar(feedbacks),
    [feedbacks],
  );
  return (
    <View className="gap-5">
      <View className="gap-2">
        <Text className="text-2xl font-mbold">Guest Experiences</Text>
        <View className="flex-row items-center gap-4">
          <Text className="text-5xl font-mbold">{averageStar}</Text>
          <View className="items-center gap-1">
            <StarRatingDisplay
              color="#005CAB"
              starSize={18}
              rating={Number(averageStar)}
            />
            <Text className="font-regular">{`Base on ${feedbacks.length} reviews`}</Text>
          </View>
        </View>
      </View>

      <View className="gap-2">
        {feedbacks.map((feedback, index) => (
          <FeedbackCard key={index} feedback={feedback} />
        ))}
      </View>
    </View>
  );
}

const FeedbackCard = ({
  feedback,
}: {
  feedback: {
    user: string;
    rating: number;
    comment: string;
  };
}) => {
  const imageUrl = "./../../../assets/images/myavatar.jpg";
  return (
    <View
      style={{
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      }}
      className="gap-5 p-5 bg-white rounded-xl"
    >
      <View className="flex-row justify-between">
        <View className="flex-row items-start justify-center gap-3">
          <Image
            className="w-10 h-10 rounded-full"
            resizeMode="cover"
            source={require(imageUrl)}
          />
          <View>
            <Text className="font-mbold">
              {formatMemberName(feedback.user)}
            </Text>
            <Text className="font-regular">{getRandomMember()}</Text>
          </View>
        </View>

        <StarRatingDisplay
          starSize={12}
          color="#005cab"
          rating={feedback.rating}
        />
      </View>

      <Text className="font-italic">"{feedback.comment}"</Text>
    </View>
  );
};
