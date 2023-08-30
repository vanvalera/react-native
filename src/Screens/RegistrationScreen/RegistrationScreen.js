import { useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { Text, View } from "react-native";
import { CrossIcon, UnionIcon } from "../../../assets/svgIcons/icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../styles/globalStyles";
import { BackgroundImage } from "../../component/BackgroundImage";
import { useNavigation } from "@react-navigation/native";
import { Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { uploadPhotoOnServer } from "../../services/uploadPhotoOnServer";
import { delPhotoFromServer } from "../../services/delPhotoFromServer";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";

export const RegistartionScreen = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const [login, setLogin] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [isSecureEnter, setIsSecureEnter] = useState(true);

  const togleSecureEnter = () => {
    setIsSecureEnter(!isSecureEnter);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      const uploadedPhoto = await uploadPhotoOnServer(
        result.assets[0].uri,
        "avatars"
      );
      setImage(uploadedPhoto);
    } else alert("You didn`t choose your avatar...");
  };

  const deleteAvatar = async () => {
    try {
      await delPhotoFromServer(image.finalPath);
      setImage(null);
    } catch (error) {
      alert("Something went wrong.");
    }
  };

  const handleFormSubmit = () => {
    if (!login.trim() || !mail.trim() || !password.trim()) {
      alert("Please, fill in all fields to continue");
      return;
    }
    const photoUrl = image ? `${image.photoLink} ${image.finalPath}` : null;
    dispatch(register({ mail, password, login, photoUrl }))
      .unwrap()
      .then(() => navigation.navigate("Home"))
      .catch((e) =>
        alert("Something went wrong... Check your credentials and try again.")
      );

    setLogin("");
    setMail("");
    setPassword("");
    setImage(null);
  };

  const navigateToLoginScreen = () => {
    if (image) deleteAvatar();
    navigation.navigate("Login");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={globalStyles.container}>
        <BackgroundImage>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            <View style={{ flex: 1, justifyContent: "flex-end" }}>
              <View
                style={[
                  styles.formContainer,
                  {
                    paddingBottom: isKeyboardOpen ? 32 : 78,
                    height: isKeyboardOpen ? 374 : "auto",
                  },
                ]}
              >
                <View style={styles.photoContainer}>
                  {image?.photoLink && (
                    <Image
                      source={{ uri: image.photoLink }}
                      style={{ width: 120, height: 120, borderRadius: 16 }}
                    />
                  )}
                  {image ? (
                    <TouchableOpacity
                      style={globalStyles.deletePhotoBtn}
                      onPress={deleteAvatar}
                    >
                      <CrossIcon />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={globalStyles.addPhotoButton}
                      onPress={pickImage}
                    >
                      <UnionIcon fill="#ff6c00" />
                    </TouchableOpacity>
                  )}
                </View>
                <Text style={styles.formTitle}>Реєстрація</Text>
                <TextInput
                  style={[globalStyles.commonTextStyles, styles.input]}
                  value={login}
                  onChangeText={setLogin}
                  onFocus={() => setIsKeyboardOpen(true)}
                  onBlur={() => setIsKeyboardOpen(false)}
                  placeholder="Логін"
                  placeholderTextColor={"#bdbdbd"}
                />
                <TextInput
                  style={[globalStyles.commonTextStyles, styles.input]}
                  value={mail}
                  onChangeText={setMail}
                  onFocus={() => setIsKeyboardOpen(true)}
                  onBlur={() => setIsKeyboardOpen(false)}
                  placeholder="Адреса електронної пошти"
                  placeholderTextColor={"#bdbdbd"}
                />
                <View style={{ marginBottom: 27 }}>
                  <TextInput
                    style={[globalStyles.commonTextStyles, styles.input]}
                    value={password}
                    onChangeText={setPassword}
                    onFocus={() => setIsKeyboardOpen(true)}
                    onBlur={() => setIsKeyboardOpen(false)}
                    placeholder="Пароль"
                    placeholderTextColor={"#bdbdbd"}
                    secureTextEntry={isSecureEnter}
                  />
                  <TouchableOpacity
                    onPress={togleSecureEnter}
                    style={styles.securePasswordButton}
                  >
                    <Text
                      style={[
                        globalStyles.commonTextStyles,
                        { color: "#1b4371" },
                      ]}
                    >
                      {isSecureEnter ? "Показати" : "Сховати"}
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={handleFormSubmit}
                  style={[globalStyles.button, globalStyles.activeBtn]}
                >
                  <Text
                    style={[
                      globalStyles.commonTextStyles,
                      globalStyles.activeBtnValue,
                    ]}
                  >
                    Зареєстуватися
                  </Text>
                </TouchableOpacity>
                <View style={styles.loginInBox}>
                  <Text
                    style={[globalStyles.commonTextStyles, styles.loginInText]}
                  >
                    Вже є акаунт?{" "}
                  </Text>
                  <TouchableOpacity onPress={navigateToLoginScreen}>
                    <Text
                      style={[
                        globalStyles.commonTextStyles,
                        styles.loginInText,
                        styles.loginInLink,
                      ]}
                    >
                      Увійти
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </BackgroundImage>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: "100%",
    paddingTop: 92,
    paddingRight: 16,
    paddingLeft: 16,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  photoContainer: {
    position: "absolute",
    top: -60,
    left: "50%",
    transform: [{ translateX: -50 }],
    width: 120,
    height: 120,
    backgroundColor: "#f6f6f6",
    borderRadius: 16,
  },
  formTitle: {
    marginBottom: 32,
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    fontWeight: 500,
    lineHeight: 35.16,
    letterSpacing: 0.3,
    color: "#212121",
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 10,
    borderColor: "#e8e8e8",
    backgroundColor: "#f6f6f6",
    marginBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
  loginInBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  loginInText: {
    color: "#1b4371",
    textAlign: "center",
  },
  loginInLink: {
    textDecorationLine: "underline",
  },
  securePasswordButton: {
    position: "absolute",
    top: 16,
    right: 16,
  },
});
