import { Text, View, SafeAreaView, Image } from "react-native";
import tw from "twrnc";
import React from "react";
import NavOptions from "../components/NavOptions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from "react-redux";
import { setOrigin, setDestination } from "../slices/NavSlice";
import NavFavourites from "../components/NavFavourites";

const HomeScreen = () => {
  const dispatch = useDispatch();

  //Component ========
  return (
    <SafeAreaView style={tw`bg-white h-full pt-8`}>
      <View style={tw`p-5`}>
        <Image
          style={{ width: 100, height: 100, resizeMode: "contain" }}
          source={{ uri: "https://links.papareact.com/gzs" }}
        />

      <GooglePlacesAutocomplete
        styles={{
          container: {
            flex: 0,
          },
          textInput: {
            fontSize: 18,
          },
        }}
        returnKeyType={"search"}
        onPress={(data, details = null) => {
          dispatch(
            setOrigin({
              location: details.geometry.location,
              description: data.description,
            })
          );
          dispatch(setDestination(null));
        }}
        fetchDetails={true}
        minLength={2}
        enablePoweredByContainer={false}
        query={{ key: GOOGLE_MAPS_APIKEY, language: "en" }}
        nearbyPlacesAPI="GooglePlacesSearch"
        debounce={400}
        placeholder="Where From ?"
      />

      <NavOptions />
      <NavFavourites/>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
