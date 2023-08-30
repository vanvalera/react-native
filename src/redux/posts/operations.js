import { createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/config";
export const addPost = createAsyncThunk(
  "posts/addPost",
  async (data, { rejectWithValue }) => {
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        ...data,
        comments: [],
      });
      const q = query(
        collection(db, "posts"),
        where("userId", "==", data.userId)
      );
      const docs = await getDocs(q);
      const res = [];
      docs.forEach((doc) => res.push({ postId: doc.id, ...doc.data() }));
      return res;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const getAllPosts = createAsyncThunk(
  "posts/getPosts",
  async (_, { rejectWithValue }) => {
    try {
      const docs = await getDocs(collection(db, "posts"));
      const res = [];
      docs.forEach((doc) => res.push({ postId: doc.id, ...doc.data() }));
      return res;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const getUserPosts = createAsyncThunk(
  "posts/getUserPosts",
  async (userId, { rejectWithValue }) => {
    try {
      const q = query(collection(db, "posts"), where("userId", "==", userId));
      const docs = await getDocs(q);
      const res = [];
      docs.forEach((doc) => res.push({ postId: doc.id, ...doc.data() }));
      return res;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const postComment = createAsyncThunk(
  "posts/postComment",
  async (data, { rejectWithValue }) => {
    try {
      const { postId } = data;
      const postRef = doc(db, "posts", postId);
      const postSnapshot = await getDoc(postRef);
      if (postSnapshot.exists()) {
        const post = postSnapshot.data();
        const comment = { commentId: nanoid(), ...data };

        if (!post.comments) {
          post.comments = [];
        }

        post.comments.push(comment);
        await updateDoc(postRef, post);
        return { comment, postId };
      }
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);
