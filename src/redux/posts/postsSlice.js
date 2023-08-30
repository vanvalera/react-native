import { createSlice } from "@reduxjs/toolkit";
import { addPost, getAllPosts, getUserPosts, postComment } from "./operations";
import {
  handlePending,
  handlePostCommentFulfilled,
  handlePostCommentPending,
  handlePostsOperationsFulfilled,
  handleRejected,
} from "./handlersOfActions";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    isLoading: false,
  },
  extraReducers: (builder) =>
    builder
      .addCase(addPost.pending, handlePending)
      .addCase(addPost.fulfilled, handlePostsOperationsFulfilled)
      .addCase(addPost.rejected, handleRejected)
      .addCase(getAllPosts.pending, handlePending)
      .addCase(getAllPosts.fulfilled, handlePostsOperationsFulfilled)
      .addCase(getAllPosts.rejected, handleRejected)
      .addCase(getUserPosts.pending, handlePending)
      .addCase(getUserPosts.fulfilled, handlePostsOperationsFulfilled)
      .addCase(getUserPosts.rejected, handleRejected)
      .addCase(postComment.pending, handlePostCommentPending)
      .addCase(postComment.fulfilled, handlePostCommentFulfilled)
      .addCase(postComment.rejected, handleRejected),
});

export const postsReducer = postsSlice.reducer;
