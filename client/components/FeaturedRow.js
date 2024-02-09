import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { themeColors } from "../theme";
import RestaurantCard from "./RestaurantCard";

export default function FeaturedRow({ title, restaurants, description }) {
  return (
    <View>
      <View className="flex-row items-center justify-between px-4">
        <View>
          <Text className={"text-lg font-bold"}>{title}</Text>
          <Text className="text-gray-500 text-xs">{description}</Text>
        </View>
        <TouchableOpacity>
          <Text style={{ color: themeColors.text }} className={"font-semibold"}>
            See All
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        className="py-5"
      >
        {restaurants.map((resturant) => {
          return <RestaurantCard key={resturant.id} item={resturant} />;
        })}
      </ScrollView>
    </View>
  );
}
