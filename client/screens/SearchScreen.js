import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";

import * as Icon from "react-native-feather";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";
import { searchRestaurant } from "../api";
import { urlFor } from "../sanity";
import { useDebounce } from "../hooks";
export default function SearchScreen() {
  const navigation = useNavigation();
  const [restaurants, setRestaurants] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery);

  const handleSearch = async () => {
    if (debouncedSearchQuery !== "") {
      const restaurantFromAPI = await searchRestaurant(debouncedSearchQuery);
      setRestaurants(restaurantFromAPI);
    } else {
      setRestaurants(null);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [debouncedSearchQuery]);
  return (
    <SafeAreaView
      style={{ backgroundColor: themeColors.white }}
      className="flex-1"
    >
      <View className="flex-col space-y-4 px-4 pb-4">
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
              placeholder="Resto"
              className="flex-1"
              keyboardType="default"
              onChangeText={(text) => setSearchQuery(text)}
            />
          </View>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 space-y-4 px-4"
      >
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
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Restaurant", {
                  id: restaurant._id,
                  title: restaurant.title,
                  imgUrl: restaurant.image,
                  rating: restaurant.rating,
                  type: restaurant.type?.name,
                  address: restaurant.address,
                  description: restaurant.description,
                  dishes: restaurant.dishes,
                  reviews: restaurant.reviews,
                  lng: restaurant.lng,
                  lat: restaurant.lat,
                })
              }
              key={restaurant._id}
              className="flex-row space-x-2"
            >
              <Image
                source={{ uri: urlFor(restaurant.image).url() }}
                className="w-24 h-24 rounded-2xl"
              />
              <View className="flex-1 justify-center">
                <Text className="text-lg font-bold text-gray-800">
                  {restaurant.name}
                </Text>
                <View className="flex-row items-center pb-1">
                  <Image
                    className="w-5 h-5"
                    source={require("../assets/images/fullStar.png")}
                  />
                  <Text className="text-md ">
                    {restaurant.rating} • {restaurant.reviews} reviews
                  </Text>
                </View>
                <Text className="text-gray-500">{restaurant.address}</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
