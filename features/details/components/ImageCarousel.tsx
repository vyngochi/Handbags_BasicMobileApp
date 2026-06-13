import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as React from "react";
import {
  Dimensions,
  Image,
  Pressable,
  useWindowDimensions,
  View,
} from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";

const data = [...new Array(6).keys()];
const width = Dimensions.get("window").width;

interface Props {
  variants: {
    color: string;
    images: string[];
  };

  isFavorite: boolean;
  toggleFavorite: () => void;
}

function ImageCarousel({ variants, isFavorite, toggleFavorite }: Props) {
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);
  const width = useWindowDimensions();
  const data = variants.images;

  return (
    <View className="relative">
      {data.length > 1 ? (
        <View className="relative">
          <Carousel
            width={width.width}
            ref={ref}
            style={{ width: width.width, height: width.width }}
            data={data}
            onProgressChange={progress}
            renderItem={({ item }) => (
              <Image
                resizeMode="cover"
                style={{
                  width: width.width,
                  height: width.width,
                }}
                source={{ uri: item }}
              />
            )}
            autoPlay
            autoPlayInterval={5000}
          />

          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: 12,
            }}
          >
            <Pagination.Basic
              progress={progress}
              data={data}
              dotStyle={{
                width: 8,
                height: 8,
                borderRadius: 999,
                backgroundColor: "#D1D5DB",
              }}
              activeDotStyle={{
                backgroundColor: "#005CAB",
              }}
              containerStyle={{
                gap: 8,
              }}
            />
          </View>
        </View>
      ) : (
        <Image
          style={{
            width: width.width,
            height: width.width,
          }}
          resizeMode="cover"
          source={{ uri: data[0] }}
        />
      )}

      <Pressable
        className="absolute p-2 bg-blue-200 rounded-full right-2 top-2"
        onPress={(e) => {
          e.stopPropagation();
          toggleFavorite();
        }}
      >
        <View>
          {!isFavorite ? (
            <FontAwesome name="heart-o" size={28} color="white" />
          ) : (
            <FontAwesome name="heart" size={28} color="#ff0000" />
          )}
        </View>
      </Pressable>
    </View>
  );
}

export default ImageCarousel;
