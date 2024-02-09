import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import * as Icon from "react-native-feather";
import { themeColors } from "../theme";
import { featured } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant } from "../slices/RestaurantSlice";
import {
  removeFromCart,
  selectCartItems,
  selectCartTotal,
} from "../slices/CartSlice";
export default function CartScreen() {
  const deliveryFee = 2;
  const restaurant = useSelector(selectRestaurant);
  const cartTotal = useSelector(selectCartTotal);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const [groupItems, setGroupItems] = useState([]);

  useEffect(() => {
    const items = cartItems.reduce((group, item) => {
      if (group[item.id]) {
        group[item.id].push(item);
      } else {
        group[item.id] = [item];
      }
      return group;
    }, {});
    setGroupItems(items);
  }, [cartItems]);

  return (
    <View className="bg-white flex-1">
      {/* Top Button */}
      <View className="relative py-4">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ backgroundColor: themeColors.bgColor(1) }}
          className="p-2 rounded-full absolute left-2 top-5"
        >
          <Icon.ArrowLeft stroke={"white"} strokeWidth={3} />
        </TouchableOpacity>
        <View>
          <Text className="text-center font-bold text-xl">Your cart</Text>
          <Text className="text-center text-gray-500">{restaurant.name}</Text>
        </View>
      </View>
      {/* Delivery Time */}
      <View
        style={{ backgroundColor: themeColors.bgColor(0.2) }}
        className="flex-row items-center px-6"
      >
        <Image
          source={require("../assets/images/bikeGuy.png")}
          className="w-20 h-20 rounded-full"
        />
        <Text className="font-semibold text-gray-800 pl-6 flex-1">
          Delivery in 20 - 30 minutes
        </Text>
        <Text style={{ color: themeColors.text }} className="font-bold">
          Change
        </Text>
      </View>
      {/* Card */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="bg-white pt-5"
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        {Object.entries(groupItems).map(([key, items]) => {
          let dish = items[0];
          return (
            <View
              key={key}
              className="flex-row justify-between space-x-3 m-2 px-6 py-3 rounded-3xl bg-white shadow-md"
            >
              <View className="flex-row items-center space-x-2">
                <Text
                  style={{ color: themeColors.text }}
                  className="font-bold text-lg"
                >
                  {items.length}x
                </Text>
                <Image className="w-16 h-16 rounded-full" source={dish.image} />
                <Text className="font-semibold text-lg">{dish.name}</Text>
              </View>
              <View className="flex-row items-center space-x-2">
                <Text className="font-bold text-lg">${dish.price}</Text>
                <TouchableOpacity
                  onPress={() => dispatch(removeFromCart({ id: items[0].id }))}
                  style={{ backgroundColor: themeColors.bgColor(1) }}
                  className="rounded-full p-1"
                >
                  <Icon.Minus stroke={"white"} />
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>
      {/* Summary */}
      <View
        style={{ backgroundColor: themeColors.bgColor(0.2) }}
        className="py-6 px-8 rounded-t-3xl space-y-4"
      >
        <View className="flex-row justify-between">
          <Text className="text-gray-700">Subtotal</Text>
          <Text className="text-gray-700">${cartTotal}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-700">Delivery Fee</Text>
          <Text className="text-gray-700">${deliveryFee}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="font-extrabold">Order Total</Text>
          <Text className="font-extrabold">${cartTotal + deliveryFee}</Text>
        </View>
        {/* Place Order Button */}
        <TouchableOpacity
          onPress={() => navigation.navigate("OrderPreparing")}
          style={{ backgroundColor: themeColors.bgColor(1) }}
          className="rounded-full p-4 shadow-md"
        >
          <Text className="text-center text-lg font-bold text-white">
            Place Order
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
