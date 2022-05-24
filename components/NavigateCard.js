import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import React from "react";
import tw from "twrnc";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from "react-redux";
import { setDestination } from "../slices/NavSlice";
import { useNavigation } from "@react-navigation/native";
import NavFavourites from "./NavFavourites";

const NavigateCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  //Component ===========
  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <View>
        <Text style={tw`text-center py-5 text-xl text-black font-semibold`}>
          Good Afternoon, Sands
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
                    location: details?.geometry?.location,
                    description: data.description,
                  })
                );

                navigation.navigate("RideOptionsCard");
              }}
              enablePoweredByContainer={false}
              query={{ key: GOOGLE_MAPS_APIKEY, language: "en" }}
              nearbyPlacesAPI="GooglePlacesSearch"
              debounce={400}
            />
          </View>
        </View>
        <NavFavourites />
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
