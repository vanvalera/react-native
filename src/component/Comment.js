import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { Image } from "react-native";
import { View } from "react-native";

export const Comment = ({ userImgSrc, children, date, isMyComment, style }) => {
  return (
    <View
      style={[
        styles.container,
        {
          flexDirection: isMyComment ? "row-reverse" : "row",
          ...style,
        },
      ]}
    >
      <View style={styles.userImgContainer}>
        <Image source={userImgSrc} style={styles.userImgContainer} />
      </View>
      <View
        style={[
          styles.commentInnerContainer,
          {
            borderTopLeftRadius: isMyComment ? 6 : 0,
            borderTopRightRadius: isMyComment ? 0 : 6,
          },
        ]}
      >
        <Text>{children}</Text>
        <Text
          style={[
            styles.date,
            {
              textAlign: isMyComment ? "right" : "left",
            },
          ]}
        >
          {date}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    gap: 16,
  },
  userImgContainer: {
    width: 28,
    height: 28,
    backgroundColor: "#f6f6f6",
    borderRadius: 12.5,
  },
  commentInnerContainer: {
    padding: 16,
    width: "100%",
    flexShrink: 1,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    backgroundColor: "#00000008",
  },
  commentValue: {
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    lineHeight: 18,
    color: "#212",
  },
  date: {
    marginTop: 8,
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    lineHeight: 11.72,
    color: "#bdbdbd",
  },
});
