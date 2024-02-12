import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import React, { useState } from "react";

import * as Icon from "react-native-feather";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";
import RestaurantCard from "../components/RestaurantCard";
import { searchRestaurant } from "../api";
import { urlFor } from "../sanity";
export default function SearchScreen() {
  const navigation = useNavigation();
  const [restaurants, setRestaurants] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async () => {
    const restaurantFromAPI = await searchRestaurant(searchQuery);
    setRestaurants(restaurantFromAPI);
  };
  return (
    <SafeAreaView
      style={{ backgroundColor: themeColors.white }}
      className="flex-1"
    >
      <View className="flex-col space-y-4 px-4">
        <View className="flex-row items-center space-x-2 ">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ backgroundColor: themeColors.bgColor(1) }}
            className="p-2 rounded-full"
          >
            <Icon.ArrowLeft stroke={"white"} strokeWidth={3} />
          </TouchableOpacity>
          <Text className="font-bold text-3xl">Search</Text>
        </View>
        <View className="flex-row items-center space-x-2 ">
          <View className="flex-1 flex-row items-center space-x-2 p-3 border rounded-full border-gray-300">
            <Icon.Search height={25} width={25} stroke={"gray"} />
            <TextInput
              placeholder="Restaurants"
              className="flex-1"
              keyboardType="default"
              onChangeText={(text) => setSearchQuery(text)}
              onSubmitEditing={() => handleSearch()}
            />
          </View>
        </View>
        {!restaurants ? (
          <View className="flex-row items-center space-x-2 ">
            <View
              style={{ backgroundColor: themeColors.bgColor(1) }}
              className="rounded-2xl p-2"
            >
              <Icon.AlertTriangle
                stroke={"white"}
                strokeWidth={2}
                width={40}
                height={40}
              />
            </View>
            <View className="flex-col">
              <Text className="text-lg font-bold text-gray-800">
                Cari resto terdekat
              </Text>
              <Text className="text-gray-600">Ketik nama resto</Text>
              <Text className="text-gray-600">Contoh: KFC, Mcd</Text>
            </View>
          </View>
        ) : (
          restaurants.map((restaurant) => (
            <View key={restaurant._id} className="flex-row space-x-2">
              <Image
                source={{ uri: urlFor(restaurant.image).url() }}
                className="w-24 h-24 rounded-2xl"
              />
              <View>
                <Text>{restaurant.name}</Text>
                <Text>{restaurant.rating}</Text>
              </View>
            </View>
          ))
        )}
      </View>
    </SafeAreaView>
  );
}
