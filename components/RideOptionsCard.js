import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const data = [
  {
    id: 598,
    title: "UberX",
    multiplier: 1,
    image: "https://links.papareact.com/3pn",
  },
  {
    id: 5945,
    title: "Uber XL",
    multiplier: 1.2,
    image: "https://links.papareact.com/5w8",
  },
  {
    id: 57218,
    title: "Uber LUX",
    multiplier: 1.75,
    image: "https://links.papareact.com/7pf",
  },
];

//Surge charge if prices flactuate or changes
const surge_chage_rate = 15;

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTimeInformation = useSelector(
    (state) => state.NavData.travelTimeInformation
  );

  //Component =====
  return (
    <SafeAreaView style={tw`bg-white bg-white flex-grow`}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("NavigateCard")}
          style={tw`absolute top-2 left-5 p-3 rounded-full`}
        >
          <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>
        <Text style={tw`text-center py-5 text-lg font-semibold  text-black`}>
          Select a Ride
        </Text>
      </View>

      <FlatList
        data={data}
        keyEtractor={(item) => item.id}
        renderItem={({ item: { title, multiplier, image }, item }) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            style={tw`flex-row justify-between items-center max-h-24 px-10 ${
              item.id === selected?.id ? "bg-gray-200" : ""
            }`}
          >
            <Image
              style={{ width: 100, height: 100, resizeMode: "contain" }}
              source={{ uri: image }}
            />
            <View>
              <Text style={tw`text-xl font-semibold`}>{title}</Text>
              <Text>{travelTimeInformation?.duration?.text} Travel Time</Text>
            </View>
            <Text style={tw`text-xl font-semibold`}>
              R{" "}
              {Number(
                (travelTimeInformation?.duration?.value *
                  surge_chage_rate *
                  multiplier) /
                  100
              ).toFixed(2)}
            </Text>
          </TouchableOpacity>
        )}
      />

      <View style={tw`p-2 px-6 py-4`}>
        <TouchableOpacity
          disabled={!selected}
          style={tw`bg-black py-3 rounded ${!selected ? "bg-gray-500" : ""}`}
        >
          <Text style={tw`text-center text-white text-lg`}>
            Choose {selected?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionsCard;
