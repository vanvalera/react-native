export const handleAuthorizationFulfilled = (state, { payload }) => {
  const { email, displayName, photoURL, uid } = payload;
  state.user.id = uid;
  state.user.email = email;
  state.user.displayName = displayName;
  state.isLoggedIn = true;
  if (photoURL) {
    const [photoLink, pathToAvatar] = photoURL.split(" ");
    state.user.photoLink = photoLink;
    state.user.pathToAvatar = pathToAvatar;
  }
};

export const handleUpdUserAvatarFulfilled = (state, { payload }) => {
  const [photoLink, pathToAvatar] = payload.split(" ");
  state.user.photoLink = photoLink;
  state.user.pathToAvatar = pathToAvatar;
};

export const handleDelUserAvatarFulfilled = (state, { payload }) => {
  state.user.pathToAvatar = null;
  state.user.photoLink = null;
};

export const handleLogoutFulfilled = (state, { payload }) => {
  state.user.email = null;
  state.user.displayName = null;
  state.user.photoLink = null;
  state.user.pathToAvatar = null;
  state.isLoggedIn = false;
};
