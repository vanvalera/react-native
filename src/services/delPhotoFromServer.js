import { deleteObject, ref } from "firebase/storage";
import { storage } from "../firebase/config";

export const delPhotoFromServer = async (photoPath) => {
  try {
    const desertRef = ref(storage, photoPath);
    await deleteObject(desertRef);
  } catch (error) {
    throw error;
  }
};
