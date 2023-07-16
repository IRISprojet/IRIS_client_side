import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { api } from "src/app/auth/services/api";

export const getChats = createAsyncThunk("chatApp/chats/getChats", async (params) => {
  const response = await api.get("api/conversation", { params });
  const data = await response.data;

  return data;
});

const chatsAdapter = createEntityAdapter({});

export const { selectAll: selectChats, selectById: selectChatById } = chatsAdapter.getSelectors(
  (state) => state.chatApp.chats
);

const chatsSlice = createSlice({
  name: "chatApp/chats",
  initialState: chatsAdapter.getInitialState(),
  extraReducers: {
    [getChats.fulfilled]: chatsAdapter.setAll,
  },
});

export default chatsSlice.reducer;
