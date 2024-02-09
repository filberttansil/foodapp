import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import { themeColors } from "../theme";
import * as Icon from "react-native-feather";
import { useSelector } from "react-redux";
import { selectRestaurant } from "../slices/RestaurantSlice";
export default function DeliveryScreen() {
  const resturant = useSelector(selectRestaurant);
  const navigation = useNavigation();
  return (
    <View className="flex-1">
      <MapView
        initialRegion={{
          latitude: resturant.lat,
          longitude: resturant.lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        mapType="standard"
        className="flex-1"
      >
        <Marker
          coordinate={{ latitude: resturant.lat, longitude: resturant.lng }}
          title={resturant.name}
          description={resturant.description}
          pinColor={themeColors.bgColor(1)}
        />
      </MapView>
      <View className="bg-white rounded-t-3xl -mt-12 px-6 py-8">
        <View className="flex-row  ">
          <View className="flex-1">
            <Text className="text-lg font-bold text-gray-700">
              Estimated Arrival
            </Text>
            <Text className="text-2xl font-extrabold text-gray-800">
              20 - 30 Minutes
            </Text>
            <Text className="font-bold text-gray-700 mt-1">
              Your order is own its way!
            </Text>
          </View>
          <Image
            source={require("../assets/images/bikeGuy2.gif")}
            className="w-20 h-20"
          />
        </View>
        {/* Button */}
        <View
          style={{ backgroundColor: themeColors.bgColor(1) }}
          className="p-2 my-5 flex-row rounded-full justify-between items-center"
        >
          <View
            style={{ backgroundColor: "rgba(255,255,255,0.4)" }}
            className="p-1 rounded-full"
          >
            <Image
              style={{ backgroundColor: "rgba(255,255,255,0.4)" }}
              className="w-16 h-16 rounded-full"
              source={require("../assets/images/deliveryGuy.png")}
            />
          </View>

          <View className="flex-1 ml-3">
            <Text className="text-white text-lg font-extrabold">
              Syed Noman
            </Text>
            <Text className="text-white font-bold">Your Rider</Text>
          </View>
          <View className="flex-row items-center space-x-3 mr-3">
            <TouchableOpacity className="bg-white p-2 rounded-full">
              <Icon.Phone
                stroke={themeColors.bgColor(1)}
                fill={themeColors.bgColor(1)}
                strokeWidth={1}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Home")}
              className="bg-white p-2 rounded-full"
            >
              <Icon.X stroke={"red"} strokeWidth={5} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
