import { Text, TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { View } from "react-native";
import { MapPinIcon, MessageIcon } from "../../assets/svgIcons/icons";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const Post = ({
  imgSrc,
  postName,
  numbOfComments,
  location,
  coords,
}) => {
  const navigation = useNavigation();

  const onCommentsClick = () => {
    navigation.navigate("Comments", { imgSrc });
  };

  const onLocationClick = () => {
    navigation.navigate("Maps", { coords });
  };
  return (
    <View>
      <View>
        <Image source={imgSrc} resizeMode="cover" style={styles.image} />
      </View>
      <Text style={[styles.name, styles.commonText]}>{postName}</Text>
      <View style={styles.detailsConatiner}>
        <View style={styles.commentsContainer}>
          <TouchableOpacity onPress={onCommentsClick}>
            <MessageIcon />
          </TouchableOpacity>
          <Text style={[styles.commentsValue, styles.commonText]}>
            {numbOfComments}
          </Text>
        </View>
        <View style={styles.locationConatiner}>
          <TouchableOpacity onPress={onLocationClick}>
            <MapPinIcon />
          </TouchableOpacity>
          <Text style={styles.loactionValue}>{location}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  commonText: {
    fontSize: 16,
    lineHeight: 18.75,
  },
  image: {
    width: "100%",
    height: 240,
    borderRadius: 8,
  },
  name: {
    marginTop: 8,
    marginBottom: 8,
    fontFamily: "Roboto-Medium",

    fontWeight: 500,
    color: "#212",
  },
  detailsConatiner: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  commentsContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  commentsValue: {
    fontFamily: "Roboto-Regular",
    color: "#bdbdbd",
  },
  locationConatiner: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  loactionValue: {
    fontFamily: "Roboto-Regular",
    color: "#212",
    textDecorationLine: "underline",
  },
});
