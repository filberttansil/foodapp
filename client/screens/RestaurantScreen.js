import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React, { useEffect, useMemo } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Icon from "react-native-feather";
import { themeColors } from "../theme";
import DishRow from "../components/DishRow";
import BasketIcon from "../components/BasketIcon";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant, setRestaurant } from "../slices/RestaurantSlice";
import { emptyCart } from "../slices/CartSlice";
import { urlFor } from "../sanity";
export default function RestaurantScreen() {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const dispatch = useDispatch();
  const {
    params: {
      id,
      title,
      imgUrl,
      rating,
      reviews,
      type,
      address,
      description,
      dishes,
      lng,
      lat,
    },
  } = useRoute();

  useEffect(() => {
    if (restaurant && restaurant.id != id) {
      dispatch(emptyCart());
    }
    dispatch(
      setRestaurant({
        id,
        title,
        imgUrl,
        rating,
        reviews,
        type,
        address,
        description,
        dishes,
        lng,
        lat,
      })
    );
  }, []);

  return (
    <>
      <BasketIcon />
      <StatusBar style="light" />
      <ScrollView style={{ backgroundColor: themeColors.white }}>
        <View
          style={{ backgroundColor: themeColors.white }}
          className="relative"
        >
          <Image
            source={{ uri: urlFor(imgUrl).url() }}
            className="w-full h-72"
          />
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ backgroundColor: themeColors.white }}
            className="absolute top-14 left-4  p-2 rounded-full shadow-sm"
          >
            <Icon.ArrowLeft stroke={themeColors.bgColor(1)} strokeWidth={3} />
          </TouchableOpacity>
        </View>
        <View
          style={{ backgroundColor: themeColors.white }}
          className="rounded-t-3xl px-5 pt-4 -mt-12  space-y-1"
        >
          <Text className="text-3xl font-semibold">{title}</Text>
          <View className="flex-row space-x-1 items-center">
            <Image
              source={require("../assets/images/fullStar.png")}
              className="h-4 w-4"
            />
            <Text className="text-gray-800">({reviews} review) · </Text>
            <Icon.MapPin stroke={"gray"} width={15} height={15} />
            <Text className="text-gray-800">Nearby · {address}</Text>
          </View>
          <Text className="pt-1 text-gray-500">{description}</Text>
        </View>
        <View style={{ backgroundColor: themeColors.white }} className=" pb-36">
          <Text className="px-4 py-4 font-bold text-2xl">Menu</Text>
          {dishes.map((dish) => (
            <DishRow
              key={dish._id}
              id={dish._id}
              name={dish.name}
              description={dish.description}
              price={dish.price}
              image={dish.image}
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
}
