import { createSlice } from "@reduxjs/toolkit";
import {
  delUserAvatar,
  login,
  logout,
  register,
  updUserAvatar,
} from "./operations";
import {
  handleAuthorizationFulfilled,
  handleDelUserAvatarFulfilled,
  handleLogoutFulfilled,
  handleUpdUserAvatarFulfilled,
} from "./handlersOfActions";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      id: null,
      displayName: null,
      email: null,
      photoLink: null,
      pathToAvatar: null,
    },
    isLoggedIn: false,
  },
  extraReducers: (builder) =>
    builder
      .addCase(register.fulfilled, handleAuthorizationFulfilled)
      .addCase(login.fulfilled, handleAuthorizationFulfilled)
      .addCase(updUserAvatar.fulfilled, handleUpdUserAvatarFulfilled)
      .addCase(delUserAvatar.fulfilled, handleDelUserAvatarFulfilled)
      .addCase(logout.fulfilled, handleLogoutFulfilled),
});

export const authReducer = authSlice.reducer;
