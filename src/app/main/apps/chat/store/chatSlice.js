import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "src/app/auth/services/api";

export const getChat = createAsyncThunk(
  "chatApp/chat/getChat",
  async (contactId, { dispatch, getState }) => {
    const response = await api.get(`api/message/${contactId}`);
    const data = await response.data;
    return data;
  }
);

const chatSlice = createSlice({
  name: "chatApp/chat",
  initialState: [],
  reducers: {
    removeChat: (state, action) => action.payload,
    addMessage: (state, action) => {
      const { message } = action.payload;
      state.push(message);
    },
  },
  extraReducers: {
    [getChat.fulfilled]: (state, action) => action.payload,
  },
});

export const selectChat = ({ chatApp }) => chatApp.chat;

export default chatSlice.reducer;
