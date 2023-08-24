import { Image, StyleSheet } from "react-native";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Post } from "../../component/Post";
import { globalStyles } from "../../styles/globalStyles";

export const PostsScreen = () => {
  return (
    <ScrollView>
      <View style={[globalStyles.container, styles.container]}>
        <View style={styles.profileContainer}>
          <View style={styles.photoContainer}>
            <Image source={require("../../../assets/img/userImg.png")} />
          </View>
          <View>
            <Text style={styles.userName}>Natali Romanova</Text>
            <Text style={styles.email}>email@example.com</Text>
          </View>
        </View>
        <View style={styles.postsContainer}>
          <Post
            imgSrc={require("../../../assets/img/post_1.jpg")}
            postName="Ліс"
            numbOfComments={2}
            location="Ivano-Frankivs'k Region, Ukraine"
            coords={{
              latitude: 48.84734,
              longitude: 23.44587,
            }}
          />
          <Post
            imgSrc={require("../../../assets/img/post_2.jpg")}
            postName="Захід на Чорному морі"
            numbOfComments={2}
            location="Odesa, Ukraine"
            coords={{
              latitude: 46.47747,
              longitude: 30.73262,
            }}
          />
          <Post
            imgSrc={require("../../../assets/img/post_3.jpg")}
            postName="Старий будиночок у Венеції"
            numbOfComments={2}
            location="Venezia, Italy"
            coords={{
              latitude: 45.43713,
              longitude: 12.33265,
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 43,
  },
  profileContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  photoContainer: {
    width: 60,
    height: 60,
    backgroundColor: "#f6f6f6",
    borderRadius: 16,
  },
  userName: {
    fontFamily: "Roboto-Medium",
    fontSize: 13,
    fontWeight: 700,
    lineHeight: 15.23,
  },
  email: {
    fontFamily: "Roboto-Regular",
    fontSize: 11,
    lineHeight: 12.89,
  },
  postsContainer: {
    display: "flex",
    gap: 32,
    marginTop: 32,
  },
});
