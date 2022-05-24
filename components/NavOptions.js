import { FlatList, TouchableOpacity, View, Text, Image } from "react-native";
import tw from "twrnc";
import React from "react";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const NavOptions = () => {
  const navigation = useNavigation();
  const origin = useSelector((state) => state.NavData.origin);

  return (
    <View style={tw`flex flex-row bg-white justify-between items-center`}>
      <TouchableOpacity
        disabled={!origin ? true : false}
        onPress={() => navigation.navigate("MapScreen")}
        style={tw`p-2 pl-6 pb-6 pt-4 bg-gray-200 w-[48%] h-60 rounded-sm`}
      >
        <View style={tw`${!origin ? "opacity-50" : ""}`}>
          <Image
            style={{ width: 100, height: 100, resizeMode: "contain" }}
            source={{ uri: "https://links.papareact.com/3pn" }}
          />
          <Text style={tw`mt-2 text-base font-semibold`}>Get a ride</Text>
          <Icon
            style={tw`p-2 bg-black rounded-full w-10 h-10 mt-4 mb-1`}
            name="arrowright"
            color="white"
            type="antdesign"
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={!origin ? true : false}
        onPress={() => navigation.navigate("EatsScreen")}
        style={tw`p-2 pl-6 pb-6 pt-4 bg-gray-200 w-[48%] h-60 rounded-sm`}
      >
        <View style={tw`${!origin ? "opacity-50" : ""} pt-3`}>
          <Image
            style={{ width: 90, height: 88, resizeMode: "contain" }}
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/dial-n-dine-help-desk.appspot.com/o/eats.png?alt=media&token=9e32bb0d-482b-4aef-a56b-e31888f2d1be",
            }}
          />
          <Text style={tw`mt-2 text-base font-semibold`}>Order food</Text>
          <Icon
            style={tw`p-2 bg-black rounded-full w-10 h-10 mt-4 mb-1`}
            name="arrowright"
            color="white"
            type="antdesign"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default NavOptions;
