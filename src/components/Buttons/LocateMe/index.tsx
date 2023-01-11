import React, { useContext } from "react";
import { TouchableOpacity, View } from "react-native";
import Navigate from "/assets/icons/navigate.svg";
import {
  PlaceContext,
  placeStateType,
  reverseGeocodedPlaceStateType,
} from "/components/Context";
import { getLocation } from "/helpers/locationPermission";

export const LocateMe = () => {
  const placeState: placeStateType = useContext(PlaceContext)[0];
  const reverseGeocodedPlaceState: reverseGeocodedPlaceStateType =
    useContext(PlaceContext)[1];
  const onNavigatePress = async () => {
    await reverseGeocodedPlaceState.setReverseGeocodedPlace(
      async () => await getLocation()
    );
    console.log(
      "🚀 ~ file: index.tsx:17 ~ onNavigatePress ~ getLocation()",
      await getLocation()
    );
  };
  return (
    <View
      style={{
        position: "absolute",
        top: "55%",
        left: "90%",
        marginRight: 20,
      }}
    >
      <TouchableOpacity onPress={async () => await onNavigatePress()}>
        <Navigate width={32} fill="#F2994A" style={{ flex: 1 }} />
      </TouchableOpacity>
    </View>
  );
};

export default LocateMe;
