import { TouchableOpacity } from "react-native";
import { ArrowLeftIcon } from "../../assets/svgIcons/icons";
import { useNavigation } from "@react-navigation/native";

export const ButtonToBack = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <ArrowLeftIcon style={{ marginLeft: 16 }} />
    </TouchableOpacity>
  );
};
