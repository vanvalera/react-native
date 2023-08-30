import { Image, StyleSheet } from "react-native";
import { Text, View } from "react-native";
import { Post } from "../../component/Post";
import { globalStyles } from "../../styles/globalStyles";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import { DEFAULT_AVATAR } from "../../constants/constants";
import { useEffect } from "react";
import { getAllPosts } from "../../redux/posts/operations";
import { FlatList } from "react-native";
import { selectIsLoading, selectPosts } from "../../redux/posts/selectors";
import { ActivityIndicator } from "react-native";

export const PostsScreen = () => {
  const { photoLink, displayName, email } = useSelector(selectUser);
  const posts = useSelector(selectPosts);
  const isLoading = useSelector(selectIsLoading);
  const userPhoto = photoLink ? photoLink : DEFAULT_AVATAR;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  return (
    <View style={[globalStyles.container, styles.container]}>
      <View style={styles.profileContainer}>
        <View style={styles.photoContainer}>
          <Image source={{ uri: userPhoto }} style={styles.photoContainer} />
        </View>
        <View>
          <Text style={styles.userName}>{displayName}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
      </View>
      {isLoading && <ActivityIndicator size="large" color="#ff6c00" />}
      <FlatList
        style={styles.postsContainer}
        data={posts}
        renderItem={({ item, index }) => (
          <Post
            imgSrc={{ uri: item.photoLink }}
            postName={item.postName}
            numbOfComments={item.comments.length}
            location={item.locationName}
            coords={item.location}
            postId={item.postId}
            style={{ marginBottom: index === posts.length - 1 ? 0 : 32 }}
          />
        )}
        keyExtractor={(item) => item.postId}
      />
    </View>
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
    marginTop: 32,
  },
});
