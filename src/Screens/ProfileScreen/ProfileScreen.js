import { ScrollView, Text } from "react-native";
import { BackgroundImage } from "../../component/BackgroundImage";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { CrossIcon } from "../../../assets/svgIcons/icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../styles/globalStyles";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { ButtonToLogOut } from "../../component/ButtonToLogOut";
import { UserPost } from "../../component/UserPosts";

export const ProfileScreen = () => {
  return (
    <SafeAreaView style={globalStyles.container}>
      <BackgroundImage>
        <View style={styles.container}>
          <TouchableOpacity style={{ position: "absolute", top: 22, right: 0 }}>
            <ButtonToLogOut />
          </TouchableOpacity>
          <View style={styles.userPhotoContainer}>
            <Image
              style={{ borderRadius: 16 }}
              source={require("../../../assets/img/bigUserImg.png")}
            />
            <TouchableOpacity style={styles.deletePhotoBtn}>
              <CrossIcon />
            </TouchableOpacity>
          </View>
          <Text style={styles.nameHeader}>Natali Romanova</Text>
          <ScrollView>
            <View style={{ display: "flex", gap: 32 }}>
              <UserPost
                imgSrc={require("../../../assets/img/post_1.jpg")}
                postName="Ліс"
                numbOfComments={8}
                numbOfLikes={153}
                location="Ukraine"
                coords={{
                  latitude: 48.84734,
                  longitude: 23.44587,
                }}
              />
              <UserPost
                imgSrc={require("../../../assets/img/post_2.jpg")}
                postName="Захід на Чорному морі"
                numbOfComments={3}
                numbOfLikes={200}
                location="Ukraine"
                coords={{
                  latitude: 46.47747,
                  longitude: 30.73262,
                }}
              />
              <UserPost
                imgSrc={require("../../../assets/img/post_3.jpg")}
                postName="Старий будиночок у Венеції"
                numbOfComments={50}
                numbOfLikes={200}
                location="Italy"
                coords={{
                  latitude: 45.43713,
                  longitude: 12.33265,
                }}
              />
            </View>
          </ScrollView>
        </View>
      </BackgroundImage>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignContent: "flex-end",
    width: "100%",
    height: "80%",
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 92,
    paddingBottom: 43,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: "#fff",
  },
  userPhotoContainer: {
    position: "absolute",
    top: -60,
    left: "50%",
    transform: [{ translateX: -50 }],
    width: 120,
    height: 120,
    backgroundColor: "#f6f6f6",
    borderRadius: 16,
  },
  deletePhotoBtn: {
    position: "absolute",
    top: 81,
    right: -12.5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 25,
    height: 25,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 12.5,
    backgroundColor: "#fff",
    borderColor: "#e8e8e8",
  },
  nameHeader: {
    marginBottom: 32,
    fontFamily: "Roboto-Medium",
    fontWeight: 500,
    fontSize: 30,
    lineHeight: 35.16,
    color: "#212",
    textAlign: "center",
  },
});
