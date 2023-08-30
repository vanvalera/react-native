import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { LogOutIcon } from "../../assets/svgIcons/icons";
import { logout } from "../redux/auth/operations";
import { useDispatch } from "react-redux";

export const ButtonToLogOut = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logout());
    navigation.navigate("Login");
  };

  return (
    <TouchableOpacity onPress={handleLogOut}>
      <LogOutIcon style={{ marginRight: 16 }} />
    </TouchableOpacity>
  );
};
