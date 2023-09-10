/* eslint import/no-extraneous-dependencies: off */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import _ from "@lodash";
import { showMessage } from "app/store/fuse/messageSlice";
import settingsConfig from "app/configs/settingsConfig";
import { api } from "../auth/services/api";

export const setUser = createAsyncThunk("user/setUser", async (user, { dispatch, getState }) => {
  /*
    You can redirect the logged-in user to a specific route depending on his role
    */
  if (user.loginRedirectUrl) {
    settingsConfig.loginRedirectUrl = user.loginRedirectUrl; // for example 'apps/academy'
  }

  return user;
});

export const setAccessToken = createAsyncThunk("user/setAccessToken", async (token) => {
  return token;
});

export const updateUserSettings = createAsyncThunk(
  "user/updateSettings",
  async (settings, { dispatch, getState }) => {
    const { user } = getState();
    const newUser = _.merge({}, user, { data: { settings } });

    dispatch(updateUserData(newUser));

    return newUser;
  }
);

export const updateUserShortcuts = createAsyncThunk(
  "user/updateShortucts",
  async (shortcuts, { dispatch, getState }) => {
    const { user } = getState();
    const newUser = {
      ...user,
      data: {
        ...user.data,
        shortcuts,
      },
    };

    dispatch(updateUserData(newUser));

    return newUser;
  }
);

export const logoutUser = () => async (dispatch, getState) => {
  try {
    window.sessionStorage.clear();

    await api.get("api/user/logout");

    dispatch(showMessage({ message: "successfully logged out" }));
    window.location = "/";
  } catch (error) {
    console.log(error);
  }
};

export const updateUserData = (user) => async (dispatch, getState) => {
  if (!user.role || user.role.length === 0) {
    // is guest
  }
  try {
    await api.put("api/user/updateUser", user);
    dispatch(
      showMessage({ message: "Your profile was updated succesfully !", variant: "success" })
    );
  } catch (error) {
    dispatch(showMessage({ message: error.message }));
  }
};

export const deleteUser = (password) => async (dispatch, getState) => {
  await api.delete("api/user/deleteUser", { data: { password } });
  dispatch(showMessage({ message: "user deleted successfully !", variant: "success" }));
};

export const activateMfa = (password) => async (dispatch, getState) => {
  await api.post("api/user/setMfaTrue", { password });
  dispatch(showMessage({ message: "tfa activated successfully !", variant: "success" }));
};

export const setTfaTypeToFaceId = () => async (dispatch, getState) => {
  await api.post("api/user/setTfaTypeToFaceId");
  dispatch(showMessage({ message: "tfa set to Face Id !", variant: "success" }));
};

export const setTfaTypeToAuthenticator = () => async (dispatch, getState) => {
  await api.post("api/user/setTfaTypeToAuthenticator");
  dispatch(showMessage({ message: "tfa set to authenticator !", variant: "success" }));
};

export const setTfaTypeToEmail = () => async (dispatch, getState) => {
  await api.post("api/user/setTfaTypeToEmail");
  dispatch(showMessage({ message: "tfa set to Email !", variant: "success" }));
};

export const login = (user, token) => async (dispatch, getState) => {
  try {
    // Set the access token to the store
    await Promise.all([dispatch(setAccessToken(token))]);
    // Set the the user to the store
    await Promise.all([dispatch(setUser(user))]);
    dispatch(showMessage({ message: "successfully logged in", variant: "success" }));
  } catch (error) {
    console.log(error);
  }
};

const initialState = {
  role: [], // guest
  data: {
    displayName: "welcome",
    photoURL: "assets/images/avatars/brian-hughes.jpg",
    email: "johndoe@withinpixels.com",
    shortcuts: ["apps.calendar", "apps.mailbox", "apps.contacts", "apps.tasks"],
  },
  accessToken: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLoggedOut: (state, action) => initialState,
    setToken: (state, action) => {
      state.accessToken = action.payload;
    },
    updateUser: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: {
    [updateUserSettings.fulfilled]: (state, action) => {
      state.data.settings = action.payload.data.settings;
    },
    [deleteUser.fulfilled]: (state, action) => {
      // update state as needed
    },
    [activateMfa.fulfilled]: (state, action) => {
      // update state as needed
    },
    [updateUserShortcuts.fulfilled]: (state, action) => {
      state.data.shortcuts = action.payload.data.shortcuts;
    },
    [setAccessToken.fulfilled]: (state, action) => {
      state.accessToken = action.payload;
    },
    [setUser.fulfilled]: (state, action) => {
      state.data.id = action.payload._id;
      state.role = action.payload.role;
      state.data.displayName = action.payload.displayName;
      state.data.phone = action.payload.phone;
      state.data.from = action.payload.from;
      state.data.profilePicture = action.payload.profilePicture;
      state.data.photoURL =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png";
      state.data.email = action.payload.email;
    },
  },
});

export const { userLoggedOut, setToken, updateUser } = userSlice.actions;

export const selectUser = ({ user }) => user;
export const selectUserid = ({ user }) => user._id;

export const selectAccessToken = ({ user }) => user.accessToken;
export const selectUserShortcuts = ({ user }) => user.data.shortcuts;

export default userSlice.reducer;
