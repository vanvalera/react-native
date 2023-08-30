import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { uploadPhotoOnServer } from "../../services/uploadPhotoOnServer";
import { delPhotoFromServer } from "../../services/delPhotoFromServer";

export const register = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const { mail, password, login, photoUrl } = data;
      const res = await createUserWithEmailAndPassword(auth, mail, password);
      res &&
        (await updateProfile(auth.currentUser, {
          displayName: login,
          photoURL: photoUrl,
        }));
      const { email, displayName, photoURL, uid } = res.user;
      return {
        email,
        displayName,
        photoURL,
        uid,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    const { mail, password } = data;
    try {
      const res = await signInWithEmailAndPassword(auth, mail, password);
      const { email, displayName, photoURL, uid } = res.user;
      return {
        email,
        displayName,
        photoURL,
        uid,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updUserAvatar = createAsyncThunk(
  "auth/updAvatar",
  async (data, { rejectWithValue }) => {
    try {
      const { photo, folder } = data;
      if (auth.currentUser) {
        const uploadedPhoto = await uploadPhotoOnServer(photo, folder);
        const photoURL = `${uploadedPhoto.photoLink} ${uploadedPhoto.finalPath}`;
        await updateProfile(auth.currentUser, {
          photoURL,
        });
        return photoURL;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const delUserAvatar = createAsyncThunk(
  "auth/delAvatar",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { pathToAvatar } = getState().auth.user;

      if (auth.currentUser) {
        const delPhoto = await delPhotoFromServer(pathToAvatar);
        await updateProfile(auth.currentUser, {
          photoURL: "",
        });
        return delPhoto;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await signOut(auth);
      return res;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
