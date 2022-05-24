import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from "react-redux";
import { setDestination } from "../slices/NavSlice";
import { useNavigation } from "@react-navigation/native";
import NavFavourites from "./NavFavourites";
import tw from "twrnc";
import { Icon } from "@rneui/themed";

const NavigateCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  //Component ===========
  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <View>
        <Text style={tw`text-center py-5 text-xl text-black font-semibold`}>
          {new Date().getHours() >= 1 && new Date().getHours() <= 11
            ? "Good Morning"
            : new Date().getHours() >= 12 && new Date().getHours() <= 18
            ? "Good Afternoon"
            : "Good Evening"}
          , Sands
        </Text>
        <View style={tw`border-t border-gray-200 flex-shrink`}>
          <View>
            <GooglePlacesAutocomplete
              styles={toInputBoxStyles}
              placeholder="Where To ?"
              returnKeyType={"search"}
              onPress={(data, details = null) => {
                dispatch(
                  setDestination({
                    location: details.geometry.location,
                    description: data.description,
                  })
                );

                navigation.navigate("RideOptionsCard");
              }}
              fetchDetails={true}
              minLength={2}
              enablePoweredByContainer={false}
              query={{ key: GOOGLE_MAPS_APIKEY, language: "en" }}
              nearbyPlacesAPI="GooglePlacesSearch"
              debounce={400}
            />
          </View>
        </View>
        <NavFavourites />
      </View>

      {/**Bottom Btns ============= */}
      <View style={tw`flex-row bg-white justify-evenly mt-auto py-6`}>
        <TouchableOpacity
          onPress={() => navigation.navigate("RideOptionsCard")}
          style={tw`flex flex-row items-center justify-between bg-black w-28 px-6 py-1 rounded-full`}
        >
          <Icon
            style={tw`rounded-full bg-black p-3 pl-0`}
            name="car"
            type="font-awesome"
            color="white"
            size={14}
          />
          <Text style={tw`text-white text-center`}>Rides</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`flex flex-row items-center justify-between bg-gray-100 w-28 px-6 py-1 rounded-full`}
        >
          <Icon
            style={tw`rounded-full bg-gray-100 p-3 pl-0`}
            name="fast-food-outline"
            type="ionicon"
            color="black"
            size={14}
          />
          <Text style={tw`text-black text-center`}>Eats</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NavigateCard;

const toInputBoxStyles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 20,
    flex: 0,
  },
  textInput: {
    backgroundColor: "#DDDDDF",
    borderRadius: 3,
    fontSize: 18,
  },
  textInputContainer: {
    paddingHorizontal: 28,
    paddingBottom: 0,
  },
});
