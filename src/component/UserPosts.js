import { Text } from "react-native";
import { Image } from "react-native";
import { View } from "react-native";
import {
  MapPinIcon,
  MessageIcon,
  ThumbUpIcon,
} from "../../assets/svgIcons/icons";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

export const UserPost = ({
  imgSrc,
  postName,
  numbOfComments,
  numbOfLikes,
  location,
  coords,
  postId,
  style,
}) => {
  const navigation = useNavigation();

  const onCommentsClick = () => {
    navigation.navigate("Comments", { imgSrc, postId });
  };

  const onLocationClick = () => {
    navigation.navigate("Maps", { coords });
  };

  return (
    <View style={style}>
      <View>
        <Image source={imgSrc} resizeMode="cover" style={styles.image} />
      </View>
      <Text style={[styles.name, styles.commonText]}>{postName}</Text>
      <View style={styles.detailsConatiner}>
        <View style={{ display: "flex", flexDirection: "row", gap: 24 }}>
          <View style={styles.commentsContainer}>
            <TouchableOpacity onPress={onCommentsClick}>
              <MessageIcon fill={"#ff6c00"} stroke={"#ff6c00"} />
            </TouchableOpacity>
            <Text style={[styles.commentsValue, styles.commonText]}>
              {numbOfComments}
            </Text>
          </View>
          <View style={styles.commentsContainer}>
            <ThumbUpIcon />
            <Text style={[styles.commentsValue, styles.commonText]}>
              {numbOfLikes}
            </Text>
          </View>
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
    color: "#212",
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
