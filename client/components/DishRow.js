import { View, Text, Image, TouchableOpacity } from "react-native";
import * as Icon from "react-native-feather";
import { themeColors } from "../theme";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  selectCartItemsById,
} from "../slices/CartSlice";
import { urlFor } from "../sanity";
import { useEffect } from "react";

export default function DishRow({ name, description, id, price, image }) {
  const dispatch = useDispatch();
  const totalItems = useSelector((state) => selectCartItemsById(state, id));
  const handleIncrease = () => {
    dispatch(addToCart({ id, name, price, image, description }));
  };
  const handleDecrease = () => {
    dispatch(removeFromCart({ id }));
  };

  return (
    <View
      className="flex-row rounded-3xl mx-2 shadow-2xl mb-3 p-3 "
      style={{ backgroundColor: themeColors.white }}
    >
      <Image
        source={{ uri: urlFor(image).url() }}
        className="w-24 h-24 rounded-xl"
      />
      <View className="flex flex-1 space-y-3">
        <View className="pl-3">
          <Text className="text-xl">{name}</Text>
          <Text className="text-gray-700">{description}</Text>
        </View>

        <View className="flex-row pl-3 items-center justify-between">
          <Text className="text-lg font-bold text-gray-700">${price}</Text>
          <TouchableOpacity
            onPress={handleDecrease}
            disabled={!totalItems.length}
            style={{ backgroundColor: themeColors.bgColor(1) }}
            className="rounded-full p-1"
          >
            <Icon.Minus
              stroke={"white"}
              width={20}
              height={20}
              strokeWidth={3}
            />
          </TouchableOpacity>
          <Text className="text-gray-700">{totalItems.length}</Text>
          <TouchableOpacity
            onPress={handleIncrease}
            style={{ backgroundColor: themeColors.bgColor(1) }}
            className="p-1 rounded-full"
          >
            <Icon.Plus
              stroke={"white"}
              width={20}
              height={20}
              strokeWidth={3}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
