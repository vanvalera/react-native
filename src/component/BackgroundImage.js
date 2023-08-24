import { ImageBackground } from "react-native";
import { globalStyles } from "../styles/globalStyles";

export const BackgroundImage = ({ children }) => {
  return (
    <ImageBackground
      source={require("../../assets/img/Photo_BG.jpg")}
      resizeMode="cover"
      style={globalStyles.backgroundImage}
    >
      {children}
    </ImageBackground>
  );
};
