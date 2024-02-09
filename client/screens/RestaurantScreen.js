import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Icon from "react-native-feather";
import { themeColors } from "../theme";
import DishRow from "../components/DishRow";
import BasketIcon from "../components/BasketIcon";
import { useDispatch } from "react-redux";
import { setRestaurant } from "../slices/RestaurantSlice";
export default function RestaurantScreen() {
  const { params } = useRoute();
  let { item } = params;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  useEffect(() => {
    if (item && item.id) {
      dispatch(setRestaurant({ ...item }));
    }
  }, []);

  return (
    <>
      <BasketIcon />
      <StatusBar style="light" />
      <ScrollView>
        <View className="relative">
          <Image source={item.image} className="w-full h-72" />
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="absolute top-14 left-4 bg-gray-50 p-2 rounded-full shadow-sm"
          >
            <Icon.ArrowLeft stroke={themeColors.bgColor(1)} strokeWidth={3} />
          </TouchableOpacity>
        </View>
        <View className="rounded-t-3xl px-5 pt-4 -mt-12 bg-white space-y-1">
          <Text className="text-3xl font-semibold">{item.name}</Text>
          <View className="flex-row space-x-1 items-center">
            <Image
              source={require("../assets/images/fullStar.png")}
              className="h-4 w-4"
            />
            <Text className="text-gray-800">({item.review} review) · </Text>
            <Icon.MapPin stroke={"gray"} width={15} height={15} />
            <Text className="text-gray-800">Nearby · {item.address}</Text>
          </View>
          <Text className="pt-1 text-gray-500">{item.description}</Text>
        </View>
        <View className="bg-white pb-36">
          <Text className="px-4 py-4 font-bold text-2xl">Menu</Text>
          {item.dishes.map((dish, idx) => (
            <DishRow key={idx} dish={dish} />
          ))}
        </View>
      </ScrollView>
    </>
  );
}
