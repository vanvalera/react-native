import { useRoute } from "@react-navigation/native";
import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export const MapScreen = () => {
  const {
    params: { coords },
  } = useRoute();
  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        region={{
          ...coords,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        minZoomLevel={1}
      >
        {coords && <Marker title="I am here" coordinate={coords} />}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
