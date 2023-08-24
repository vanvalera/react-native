import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { LogOutIcon } from "../../assets/svgIcons/icons";

export const ButtonToLogOut = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate("Login")}>
      <LogOutIcon style={{ marginRight: 16 }} />
    </TouchableOpacity>
  );
};
