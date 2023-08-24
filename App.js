import "react-native-gesture-handler";
import { RegistartionScreen } from "./src/Screens/RegistrationScreen/RegistrationScreen";
import { CommentsScreen } from "./src/Screens/CommentsScreen/CommentsScreen";
import { useFonts } from "expo-font";
import { LoginScreen } from "./src/Screens/LoginScreen/LoginScreen";
import { Home } from "./src/Screens/Home/Home";
import { MapScreen } from "./src/Screens/MapScreen/MapScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { ButtonToBack } from "./src/component/ButtonToBack";

const MainStack = createStackNavigator();

const App = () => {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="Login">
        <MainStack.Screen
          name="Registration"
          component={RegistartionScreen}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name="Comments"
          component={CommentsScreen}
          options={{
            title: "Коментарі",
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
            headerTitleAlign: "center",
            headerLeft: () => <ButtonToBack />,
          }}
        />
        <MainStack.Screen
          name="Maps"
          component={MapScreen}
          options={{
            title: "Мапа",
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
            headerTitleAlign: "center",
            headerLeft: () => <ButtonToBack />,
          }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
