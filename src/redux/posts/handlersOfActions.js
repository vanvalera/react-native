export const handlePostsOperationsFulfilled = (state, { payload }) => {
  state.posts = payload;
  state.isLoading = false;
};

export const handlePostCommentFulfilled = (state, { payload }) => {
  const { comment, postId } = payload;
  const idx = state.posts.findIndex((post) => post.postId === postId);
  state.posts[idx].comments.push(comment);
  state.isLoading = false;
};

export const handlePending = (state, action) => {
  state.isLoading = true;
  state.posts = [];
};

export const handlePostCommentPending = (state, action) => {
  state.isLoading = true;
};

export const handleRejected = (state, action) => {
  state.isLoading = false;
};
