import { useRoute } from "@react-navigation/native";
import { Keyboard, Platform, View } from "react-native";
import { Image } from "react-native";
import { globalStyles } from "../../styles/globalStyles";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native";
import { Comment } from "../../component/Comment";
import { TouchableWithoutFeedback } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { useEffect, useState } from "react";
import { TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import { ArrowUpIcon } from "../../../assets/svgIcons/icons";
import { useDispatch, useSelector } from "react-redux";
import { postComment } from "../../redux/posts/operations";
import { getCommentDate } from "../../services/getCommentDate";
import { selectUser } from "../../redux/auth/selectors";
import { selectPosts } from "../../redux/posts/selectors";
import { FlatList } from "react-native";
import { DEFAULT_AVATAR } from "../../constants/constants";

export const CommentsScreen = () => {
  const {
    params: { imgSrc, postId },
  } = useRoute();
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [comments, setComments] = useState([]);

  const dispatch = useDispatch();

  const { photoLink, id } = useSelector(selectUser);
  const posts = useSelector(selectPosts);

  const userPhoto = photoLink ? photoLink : DEFAULT_AVATAR;

  useEffect(() => {
    const idx = posts.findIndex((post) => post.postId === postId);
    const comments = posts[idx].comments;
    setComments(comments);
  }, [posts]);

  const handlePostComment = () => {
    if (!commentValue) {
      alert("Type in your comment.");
      return;
    }

    dispatch(
      postComment({
        commentValue,
        date: getCommentDate(Date.now()),
        userImgSrc: userPhoto,
        postId,
        userId: id,
      })
    );

    setCommentValue("");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View
          style={[
            globalStyles.container,
            styles.container,
            {
              paddingBottom: isKeyboardOpen ? 90 : 16,
            },
          ]}
        >
          <Image source={imgSrc} style={styles.image} />
          <FlatList
            style={{ marginBottom: 32 }}
            data={comments}
            renderItem={({ item, index }) => (
              <Comment
                userImgSrc={{ uri: item.userImgSrc }}
                date={item.date}
                isMyComment={item.userId === id}
                style={{ marginBottom: index === posts.length - 1 ? 0 : 24 }}
              >
                {item.commentValue}
              </Comment>
            )}
            keyExtractor={(item) => item.commentId}
          />
          <View>
            <TextInput
              value={commentValue}
              onChangeText={setCommentValue}
              onFocus={() => setIsKeyboardOpen(true)}
              onBlur={() => setIsKeyboardOpen(false)}
              placeholder="Коментувати..."
              style={styles.input}
              placeholderTextColor={"#bdbdbd"}
            />
            <TouchableOpacity
              style={styles.postCommentBtn}
              onPress={handlePostComment}
            >
              <ArrowUpIcon />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
  },
  image: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    marginBottom: 32,
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
  input: {
    paddingLeft: 16,
    paddingRight: 16,
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 25,
    borderColor: "#e8e8e8",
    backgroundColor: "#f6f6f6",
    fontFamily: "Inter-Medium",
    fontSize: 16,
    lineHeight: 19.36,
  },
  postCommentBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    justifyContent: "center",
    alignItems: "center",
    width: 34,
    height: 34,
    backgroundColor: "#ff6c00",
    borderRadius: 17,
  },
});
