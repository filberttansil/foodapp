import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotal } from "../slices/CartSlice";

export default function BasketIcon() {
  const navigation = useNavigation();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  if (!cartItems.length) return;

  return (
    <View className="absolute bottom-5 z-50 w-full">
      <TouchableOpacity
        onPress={() => navigation.navigate("Cart")}
        style={{ backgroundColor: themeColors.bgColor(1) }}
        className="flex-row justify-between items-center mx-5 rounded-full p-4 py-3 shadow-lg"
      >
        <View
          className="p-2 px-4 rounded-full"
          style={{ backgroundColor: "rgba(255,255,255,0.3)" }}
        >
          <Text className="font-extrabold text-white text-lg">
            {cartItems.length}
          </Text>
        </View>
        <Text className="text-white font-bold text-xl">View Cart</Text>
        <Text className="font-bold text-white text-xl">${cartTotal}</Text>
      </TouchableOpacity>
    </View>
  );
}
