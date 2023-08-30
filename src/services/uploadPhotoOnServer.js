import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase/config";
import { nanoid } from "@reduxjs/toolkit";

export const uploadPhotoOnServer = async (uri, folderPath) => {
  try {
    const response = await fetch(uri);
    const file = await response.blob();
    const uniqueName = nanoid();
    const finalPath = `${folderPath}/${uniqueName}`;
    const storageRef = ref(storage, finalPath);
    await uploadBytes(storageRef, file);
    const photoLink = await getDownloadURL(ref(storageRef));
    return { photoLink, finalPath };
  } catch (error) {
    console.log(error);
  }
};
