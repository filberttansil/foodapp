import { View, Text, TouchableWithoutFeedback, Image } from "react-native";
import React, { useEffect } from "react";
import { themeColors } from "../theme";
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import { urlFor } from "../sanity";

export default function RestaurantCard({
  id,
  title,
  imgUrl,
  rating,
  type,
  address,
  description,
  dishes,
  reviews,
  lng,
  lat,
}) {
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate("Restaurant", {
          id,
          title,
          imgUrl,
          rating,
          type,
          address,
          description,
          dishes,
          reviews,
          lng,
          lat,
        })
      }
    >
      <View
        style={{ shadowColor: themeColors.bgColor(0.2), shadowRadius: 7 }}
        className={"mr-6 bg-white rounded-3xl shadow-lg"}
      >
        <Image
          className="h-36 w-64 rounded-t-3xl"
          source={{ uri: urlFor(imgUrl).url() }}
        />
        <View className="px-3 pb-4 pt-2 space-y-2">
          <Text className="text-lg font-semibold">{title}</Text>
          <View className="flex-row items-center space-x-1">
            <Image
              source={require("../assets/images/fullStar.png")}
              className="h-4 w-4"
            />
            <Text className="text-xs">
              <Text>{rating}</Text>
              <Text className="text-gray-700">
                ({reviews} review) ·{" "}
                <Text className={"font-semibold text-gray-600"}>{type}</Text>
              </Text>
            </Text>
          </View>
          <View className="flex-row items-center space-x-1">
            <Icon.MapPin stroke={"gray"} width={15} height={15} />
            <Text className="text-gray-700 text-xs">Nearby · {address}</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
