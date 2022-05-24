//import { StyleSheet, Text, View } from "react-native";
import React, { useRef, useEffect } from "react";
import tw from "twrnc";
import MapView, { Marker } from "react-native-maps";
import { useSelector, useDispatch } from "react-redux";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { setTravelTimeInformation } from "../slices/NavSlice";

const Map = () => {
  const dispatch = useDispatch();
  const origin = useSelector((state) => state.NavData.origin);
  const destination = useSelector((state) => state.NavData.destination);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!origin || !destination) return;
    //Zoom to fit
    mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    });
  }, [destination, origin]);

  //Calculate Travel Time ========
  useEffect(() => {
    if (!origin || !destination) return;
    const getTravelTime = async () => {
      fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin?.description}&destinations=${destination?.description}&key=${GOOGLE_MAPS_APIKEY}`
      )
        .then((res) => res.json())
        .then((data) => {
          dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
        });
    };

    getTravelTime();
  }, [destination, origin, GOOGLE_MAPS_APIKEY]);

  //Component =========
  return (
    <MapView
      ref={mapRef}
      style={tw`flex-1`}
      mapType="mutedStandard"
      initialRegion={{
        latitude: origin.location.lat,
        longitude: origin.location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      {origin && destination && (
        <MapViewDirections
          origin={origin?.description}
          destination={destination?.description}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="black"
        />
      )}

      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin?.location.lat,
            longitude: origin?.location.lng,
          }}
          title="Origin"
          descritpion={origin.description}
          identify="origin"
        />
      )}

      {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination?.location.lat,
            longitude: destination?.location.lng,
          }}
          title="Destination"
          descritpion={destination?.description}
          identify="destination"
        />
      )}
    </MapView>
  );
};

export default Map;
