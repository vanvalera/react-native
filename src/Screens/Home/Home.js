import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import { GridIcon, UnionIcon, UserIcon } from "../../../assets/svgIcons/icons";
import { PostsScreen } from "../PostsScreen/PostsScreen";
import { CreatePostsScreen } from "../CreatePostsScreen/CreatePostsScreen";
import { ProfileScreen } from "../ProfileScreen/ProfileScreen";
import { StyleSheet } from "react-native";
import { ButtonToBack } from "../../component/ButtonToBack";
import { ButtonToLogOut } from "../../component/ButtonToLogOut";

const Tabs = createBottomTabNavigator();
export const Home = () => {
  return (
    <Tabs.Navigator
      initialRouteName="Posts"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Posts") {
            return (
              <View
                style={
                  focused ? styles.focusedIconContainer : styles.iconContainer
                }
              >
                <GridIcon stroke={focused ? "#ffffff" : "#212121"} />
              </View>
            );
          } else if (route.name === "CreatePosts") {
            return (
              <View
                style={
                  focused ? styles.focusedIconContainer : styles.iconContainer
                }
              >
                <UnionIcon fill={focused ? "#ffffff" : "#212121"} />
              </View>
            );
          } else if (route.name === "Profile") {
            return (
              <View
                style={
                  focused ? styles.focusedIconContainer : styles.iconContainer
                }
              >
                <UserIcon stroke={focused ? "#ffffff" : "#212121"} />
              </View>
            );
          }
        },
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 83,
          paddingTop: 9,
          paddingLeft: 82,
          paddingRight: 82,
          paddingBottom: 22,
          justifyContent: "center",
          alignItems: "center",
        },
        headerStyle: {
          borderBottomWidth: 1,
        },
        headerTitleStyle: {
          fontFamily: "Roboto-Medium",
          fontWeight: 500,
          color: "#212121",
          fontSize: 17,
          lineHeight: 22,
          letterSpacing: -0.408,
        },
      })}
    >
      <Tabs.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          title: "Публікації",
          headerTitleAlign: "center",
          headerRight: () => <ButtonToLogOut />,
        }}
      />
      <Tabs.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={{
          title: "Створити публікацію",
          headerTitleAlign: "center",
          headerLeft: () => <ButtonToBack />,
          tabBarStyle: { display: "none" },
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 40,
  },
  focusedIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 40,
    backgroundColor: "#ff6c00",
    borderRadius: 20,
  },
});
