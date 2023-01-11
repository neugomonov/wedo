import React, { useContext, useEffect } from "react";
import { Text, View } from "react-native";
import { styles } from "./index.styles";
import MarkerIcon from "/assets/icons/marker.svg";
import { PrimaryButton } from "/components/Buttons/PrimaryButton";
import {
  PlaceContext,
  placeStateType,
  reverseGeocodedPlaceStateType,
} from "/components/Context";
import { InputWithAutocompleteAndLiner } from "/components/InputWithAutocompleteAndLiner";
import { GooglePlaceDetail } from "/components/MapsAutocomplete";
import { fetchedFormattedAddress } from "/helpers/fetchedFormattedAddress";

const BottomDrawerBody = React.memo(() => {
  const reverseGeocodedPlaceState: reverseGeocodedPlaceStateType =
    // @ts-expect-error - Object is of type 'unknown'.ts(2571)
    useContext(PlaceContext)[1];
  // @ts-expect-error - Object is of type 'unknown'.ts(2571)
  const placeState: placeStateType = useContext(PlaceContext)[0];
  const onPlaceSelected = async (details: GooglePlaceDetail | null) => {
    const position = {
      latitude: details?.geometry.location.lat || 0,
      longitude: details?.geometry.location.lng || 0,
    };
    fetchedFormattedAddress(position);
    placeState.setPlace(position);
    const fetchedFormattedAddressRes = await fetchedFormattedAddress(position);
    reverseGeocodedPlaceState.setReverseGeocodedPlace(
      fetchedFormattedAddressRes
    );
    // ! moveTo(position);
  };
  useEffect(() => {
    async () => await onPlaceSelected(placeState.place);
    async () => await onPrimaryButtonPress;
    return () => {};
  }, [placeState.place, reverseGeocodedPlaceState.reverseGeocodedPlace]);
  const onPrimaryButtonPress = async () => {
    fetchedFormattedAddress(placeState.place);
    reverseGeocodedPlaceState.setReverseGeocodedPlace(
      await fetchedFormattedAddress(placeState.place)
    );
    console.log(
      `🌎 Адрес текстом: "${await fetchedFormattedAddress(
        placeState.place
      )}" + 📍 Координаты: "${JSON.stringify(placeState.place)}" `
    );
  };
  return (
    <View style={styles.bottomDrawerWrapper}>
      <View style={styles.linkAddress}>
        <MarkerIcon width={36} fill="#87A3DD" style={{ flex: 1 }} />
        <Text style={styles.baseText}>
          {reverseGeocodedPlaceState.reverseGeocodedPlace}
        </Text>
      </View>
      {
        // TODO: There 👇 I should put a label tag for the semantic purposes. It'll need to be dealt with later on
      }
      <Text style={styles.accentText}>Поиск</Text>
      <View style={styles.bottomDrawerWrapperCentered}>
        <InputWithAutocompleteAndLiner onPlaceSelected={onPlaceSelected} />
        <PrimaryButton
          title={"Готово"}
          onPress={async () => await onPrimaryButtonPress()}
        />
      </View>
    </View>
  );
});

export default BottomDrawerBody;
