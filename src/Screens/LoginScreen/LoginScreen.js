import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../styles/globalStyles";
import { BackgroundImage } from "../../component/BackgroundImage";
import { useNavigation } from "@react-navigation/native";
import { Platform } from "react-native";

export const LoginScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [isSecureEnter, setIsSecureEnter] = useState(true);

  const togleSecureEnter = () => {
    setIsSecureEnter(!isSecureEnter);
  };

  const handleFormSubmit = () => {
    if (!email.trim() || !password.trim()) return;
    console.log("Email: ", email);
    console.log("Password: ", password);
    navigation.navigate("Home");
    setEmail("");
    setPassword("");
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
                    paddingBottom: isKeyboardOpen ? 32 : 111,
                    height: isKeyboardOpen ? 248 : "auto",
                  },
                ]}
              >
                <Text style={styles.formTitle}>Увійти</Text>
                <TextInput
                  style={[globalStyles.commonTextStyles, styles.input]}
                  value={email}
                  onChangeText={setEmail}
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
                    Увійти
                  </Text>
                </TouchableOpacity>
                <View style={styles.signInBox}>
                  <Text
                    style={[globalStyles.commonTextStyles, styles.signInText]}
                  >
                    Немає акаунту?{" "}
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Registration")}
                  >
                    <Text
                      style={[
                        globalStyles.commonTextStyles,
                        styles.signInText,
                        styles.signInLink,
                      ]}
                    >
                      Зареєструватися
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
    paddingTop: 32,
    paddingRight: 16,
    paddingLeft: 16,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
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
  signInBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  signInText: {
    color: "#1b4371",
    textAlign: "center",
  },
  signInLink: {
    textDecorationLine: "underline",
  },
  securePasswordButton: {
    position: "absolute",
    top: 16,
    right: 16,
  },
});
