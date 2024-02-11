import { View, Text, TextInput, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import * as Icon from "react-native-feather";
import { themeColors } from "../theme";
import Categories from "../components/Categories";
import { featured } from "../constants";
import FeaturedRow from "../components/FeaturedRow";
import { getFeaturedRestaurant } from "../api";
export default function HomeScreen() {
  const [featuredRestaurants, setFeaturedRestaurants] = useState([]);

  useEffect(() => {
    getFeaturedRestaurant().then((data) => {
      setFeaturedRestaurants(data);
    });
  }, []);
  return (
    <SafeAreaView className="bg-white">
      <View className="flex-row items-center space-x-2 px-4 pb-2">
        <View className="flex-1 flex-row items-center space-x-2 p-3 border rounded-full border-gray-300">
          <Icon.Search height={25} width={25} stroke={"gray"} />
          <TextInput
            placeholder="Restaurants"
            className="flex-1"
            keyboardType="default"
          />
          <View className="flex-row items-center border-0 border-l-2 border-gray-300 pl-2 space-x-1">
            <Icon.MapPin height={25} width={25} stroke={"gray"} />
            <Text>New York, NYC</Text>
          </View>
        </View>
        <View
          style={{ backgroundColor: themeColors.bgColor(1) }}
          className="p-3 rounded-full"
        >
          <Icon.Sliders width={20} height={20} stroke={"white"} />
        </View>
      </View>
      {/* Main */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        {/* Categories */}
        <Categories />

        {/* Featured */}
        <View className="mt-5">
          {featuredRestaurants?.map((item) => {
            return (
              <FeaturedRow
                key={item._id}
                id={item._id}
                featuredCategory={item._type}
                title={item.title}
                restaurants={item.restaurants}
                description={item.description}
              />
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
