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

export const CommentsScreen = () => {
  const {
    params: { imgSrc },
  } = useRoute();
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    console.log("Mount comments");
  }, []);

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
          <ScrollView>
            <Image source={imgSrc} style={styles.image} />

            <View style={{ display: "flex", gap: 24, marginBottom: 32 }}>
              <Comment
                userImgSrc={require("../../../assets/img/user1CommentImg.png")}
                date="09 червня, 2020 | 08:40"
                isMyComment={false}
              >
                Really love your most recent photo. I’ve been trying to capture
                the same thing for a few months and would love some tips!
              </Comment>
              <Comment
                userImgSrc={require("../../../assets/img/user2CommentImg.png")}
                date="09 червня, 2020 | 09:14"
                isMyComment={true}
              >
                A fast 50mm like f1.8 would help with the bokeh. I’ve been using
                primes as they tend to get a bit sharper images.
              </Comment>
              <Comment
                userImgSrc={require("../../../assets/img/user1CommentImg.png")}
                date="09 червня, 2020 | 09:20"
                isMyComment={false}
              >
                Thank you! That was very helpful!
              </Comment>
            </View>
          </ScrollView>
          <View>
            <TextInput
              onFocus={() => setIsKeyboardOpen(true)}
              onBlur={() => setIsKeyboardOpen(false)}
              placeholder="Коментувати..."
              style={styles.input}
              placeholderTextColor={"#bdbdbd"}
            />
            <TouchableOpacity style={styles.postCommentBtn}>
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
