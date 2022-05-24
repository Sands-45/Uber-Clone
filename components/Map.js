//import { StyleSheet, Text, View } from "react-native";
import React, { useRef, useEffect } from "react";
import tw from "twrnc";
import MapView, { Marker } from "react-native-maps";
import { useSelector } from "react-redux";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_APIKEY } from "@env";

const Map = () => {
  const origin = useSelector((state) => state.NavData.origin);
  const destination = useSelector((state) => state.NavData.destination);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!origin || !destination) return;

    //Zoom to fit
    mapRef.current?.fitToSuppliedMarkers([
      "origin",
      "destination",
      {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
      },
    ]);
  }, [destination, origin]);

  //Componetn =========
  return (
    <MapView
      style={tw`flex-1`}
      mapType="mutedStandard"
      initialRegion={{
        latitude: origin?.location.lat,
        longitude: origin?.location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      {origin && destination && (
        <MapViewDirections
          origin={origin.descritpion}
          destination={destination.descritpion}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="black"
        />
      )}

      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          title="Origin"
          descritpion={origin.descritpion}
          identify="origin"
        />
      )}

      {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          title="destination"
          descritpion={destination.descritpion}
          identify="destination"
        />
      )}
    </MapView>
  );
};

export default Map;
