import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import Post from "../../Elements/Post";
import ProfileElement from "../../Elements/ProfileElement";
const avatar = require("../../Source/Rectangle22.png");
import data from "../../Source/posts";

function PostsScreen({ navigation }) {
  return (
    <SafeAreaView
      style={{
        justifyContent: "flex-start",
        alignItems: "center",
        overflow: "visible",
      }}
    >
      <ScrollView>
        <ProfileElement
          avatar={avatar}
          name="Natali Romanova"
          email="email@example.com"
        />
        {data.map((el) => (
          <Post
            key={el.id}
            img={el.img}
            text={el.name}
            msgs={0}
            location={el.location}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export default PostsScreen;
