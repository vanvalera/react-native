import { Text } from "react-native";
import { BackgroundImage } from "../../component/BackgroundImage";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { CrossIcon, UnionIcon } from "../../../assets/svgIcons/icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../styles/globalStyles";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { ButtonToLogOut } from "../../component/ButtonToLogOut";
import { UserPost } from "../../component/UserPosts";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import { DEFAULT_AVATAR } from "../../constants/constants";
import * as ImagePicker from "expo-image-picker";
import { delUserAvatar, updUserAvatar } from "../../redux/auth/operations";
import { selectIsLoading, selectPosts } from "../../redux/posts/selectors";
import { FlatList } from "react-native";
import { useEffect } from "react";
import { getUserPosts } from "../../redux/posts/operations";
import { ActivityIndicator } from "react-native";

export const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { photoLink, displayName, id } = useSelector(selectUser);
  const userPhoto = photoLink ? photoLink : DEFAULT_AVATAR;
  const posts = useSelector(selectPosts);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(getUserPosts(id));
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      dispatch(
        updUserAvatar({ photo: result.assets[0].uri, folder: "avatars" })
      );
    } else alert("You didn`t choose your avatar...");
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <BackgroundImage>
        <View style={styles.container}>
          <TouchableOpacity style={{ position: "absolute", top: 22, right: 0 }}>
            <ButtonToLogOut />
          </TouchableOpacity>
          <View style={styles.userPhotoContainer}>
            <Image
              style={{ borderRadius: 16, width: 120, height: 120 }}
              source={{ uri: userPhoto }}
            />
            {photoLink ? (
              <TouchableOpacity
                style={globalStyles.deletePhotoBtn}
                onPress={() => dispatch(delUserAvatar())}
              >
                <CrossIcon />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={globalStyles.addPhotoButton}
                onPress={pickImage}
              >
                <UnionIcon fill="#ff6c00" />
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.nameHeader}>{displayName}</Text>
          {isLoading && <ActivityIndicator size="large" color="#ff6c00" />}
          <FlatList
            data={posts}
            renderItem={({ item, index }) => (
              <UserPost
                imgSrc={{ uri: item.photoLink }}
                postName={item.postName}
                numbOfComments={item.comments.length}
                numbOfLikes={0}
                location={item.locationName}
                coords={item.location}
                postId={item.postId}
                style={{ marginBottom: index === posts.length - 1 ? 0 : 32 }}
              />
            )}
            keyExtractor={(item) => item.postId}
          />
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
