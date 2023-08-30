import { Keyboard, StyleSheet, TouchableOpacity, View } from "react-native";
import { Platform } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import { Text } from "react-native";
import { globalStyles } from "../../styles/globalStyles";
import { useEffect, useState } from "react";
import {
  CameraIcon,
  MapPinIcon,
  TrashIcon,
} from "../../../assets/svgIcons/icons";
import { TextInput } from "react-native-gesture-handler";
import * as Location from "expo-location";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../../redux/posts/operations";
import { uploadPhotoOnServer } from "../../services/uploadPhotoOnServer";
import { nanoid } from "@reduxjs/toolkit";
import { selectUser } from "../../redux/auth/selectors";

export const CreatePostsScreen = () => {
  const navigation = useNavigation();
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [location, setLocation] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [photoUri, setPhotoUri] = useState("");
  const [locationName, setLocationName] = useState("");
  const [postName, setPostName] = useState("");
  const isPostInfoFull = postName && locationName && photoUri;

  const { id: userId } = useSelector(selectUser);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }
      Location.getCurrentPositionAsync({})
        .then((loc) => {
          const coords = {
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
          };
          setLocation(coords);
          return coords;
        })
        .catch((e) => console.log(e.message));
    })();
  }, []);

  if (hasPermission === null) {
    return <Text>Requesting for permisions...</Text>;
  }
  if (!hasPermission) {
    return <Text>No access to camera</Text>;
  }

  const takePhoto = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      await MediaLibrary.createAssetAsync(uri);
      setPhotoUri(uri);
    }
  };

  const clearData = () => {
    setPhotoUri(null);
    setPostName("");
    setLocationName("");
  };

  const handleCreatePost = async () => {
    const { photoLink } = await uploadPhotoOnServer(photoUri, "postsPhoto");
    await dispatch(
      addPost({
        photoLink,
        locationName,
        postName,
        location,
        userId,
      })
    );
    navigation.navigate("Home", { screen: "Posts" });
    clearData();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View
          style={[
            globalStyles.container,
            styles.container,
            {
              paddingBottom: isKeyboardOpen ? 50 : 34,
              display: "flex",
              justifyContent: "space-between",
            },
          ]}
        >
          <View>
            {!photoUri ? (
              <Camera
                style={styles.imgContainer}
                ref={setCameraRef}
                type={Camera.Constants.Type.back}
              >
                <TouchableOpacity
                  style={styles.addPhotoBtn}
                  onPress={takePhoto}
                >
                  <CameraIcon fill="#fff" />
                </TouchableOpacity>
              </Camera>
            ) : (
              <View style={styles.imgContainer}>
                <Image style={styles.photo} source={{ uri: photoUri }} />
              </View>
            )}
            <Text style={[styles.text, { marginBottom: 32 }]}>
              {photoUri ? "Редагувати фото" : "Завантажте фото"}
            </Text>
            <View>
              <TextInput
                value={postName}
                style={styles.inputName}
                placeholder="Назва..."
                placeholderTextColor="#bdbdbd"
                onFocus={() => setIsKeyboardOpen(true)}
                onBlur={() => setIsKeyboardOpen(false)}
                onChangeText={setPostName}
              />
              <View style={{ marginTop: 16, marginBottom: 32 }}>
                <MapPinIcon style={{ position: "absolute", top: 13 }} />
                <TextInput
                  value={locationName}
                  style={styles.inputLocation}
                  placeholder="Місцевість..."
                  placeholderTextColor="#bdbdbd"
                  onFocus={() => setIsKeyboardOpen(true)}
                  onBlur={() => setIsKeyboardOpen(false)}
                  onChangeText={setLocationName}
                />
              </View>
            </View>
            {isPostInfoFull ? (
              <TouchableOpacity
                style={[globalStyles.button, globalStyles.activeBtn]}
                onPress={handleCreatePost}
              >
                <Text
                  style={[
                    globalStyles.commonTextStyles,
                    globalStyles.activeBtnValue,
                  ]}
                >
                  Опубліковати
                </Text>
              </TouchableOpacity>
            ) : (
              <View style={[globalStyles.button, globalStyles.disabledBtn]}>
                <Text
                  style={[
                    globalStyles.commonTextStyles,
                    globalStyles.disabledBtnValue,
                  ]}
                >
                  Опубліковати
                </Text>
              </View>
            )}
          </View>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity style={styles.trashContainer} onPress={clearData}>
              <TrashIcon />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
  },
  imgContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    width: "100%",
    height: 240,
    backgroundColor: "#f6f6f6",
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#e8e8e8",
  },
  addPhotoBtn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 30,
  },
  text: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 18.75,
    color: "#bdbdbd",
  },
  inputName: {
    width: "100%",
    height: 50,
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 18.75,
    color: "#212",
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: "#e8e8e8",
  },
  inputLocation: {
    width: "100%",
    height: 50,
    fontFamily: "Roboto-Regular",
    paddingLeft: 28,
    fontSize: 16,
    lineHeight: 18.75,
    color: "#212",
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: "#e8e8e8",
  },
  trashContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f6f6f6",
  },
  photo: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
});
