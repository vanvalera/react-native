import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "flex-end",
  },
  button: {
    paddingTop: 16,
    paddingRight: 32,
    paddingBottom: 16,
    paddingLeft: 32,
    borderRadius: 100,
  },
  disabledBtn: {
    backgroundColor: "#f6f6f6",
  },
  disabledBtnValue: {
    color: "#bdbdbd",
    textAlign: "center",
  },
  activeBtn: {
    backgroundColor: "#ff6c00",
  },
  activeBtnValue: {
    color: "#fff",
    textAlign: "center",
  },
  commonTextStyles: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 18.75,
  },
  deletePhotoBtn: {
    position: "absolute",
    top: 81,
    right: -12.5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 25,
    height: 25,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 12.5,
    backgroundColor: "#fff",
    borderColor: "#e8e8e8",
  },
  addPhotoButton: {
    position: "absolute",
    top: 81,
    right: -12.5,
    justifyContent: "center",
    alignItems: "center",
    width: 25,
    height: 25,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 12.5,
    borderColor: "#ff6c00",
  },
});
