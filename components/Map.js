import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MapView, { Marker } from "react-native-maps";
import tw from "tailwind-react-native-classnames";
import { selectOrigin } from "../slices/navSlice";
import { useSelector } from "react-redux";

const Map = () => {
  const origin = useSelector(selectOrigin);
  console.log("origin", origin);

  // Check if origin is null or undefined before accessing its properties
  if (
    !origin ||
    !origin.location ||
    !origin.location.lat ||
    !origin.location.lon
  ) {
    // Render a loading indicator or return null if origin is not available yet
    return null;
  }

  return (
    <MapView
      style={tw`flex-1`}
      mapType="mutedStandard"
      initialRegion={{
        // The parseFloat() function is used to parse a string and convert it into a floating point number.
        latitude: parseFloat(origin.location.lat),
        longitude: parseFloat(origin.location.lon),
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      {origin?.location && (
        <Marker
          coordinate={{
            latitude: parseFloat(origin.location.lat),
            longitude: parseFloat(origin.location.lon),
          }}
          title="Origin"
          description={origin.description.display_address}
          identifier="origin"
        />
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({});
