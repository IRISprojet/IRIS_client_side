import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "src/app/auth/services/api";

export const getNotifications = createAsyncThunk("notificationPanel/getData", async () => {
  const response = await api.get("/api/notification/notifications");
  const data = await response.data;

  return data;
});

export const dismissAll = createAsyncThunk("notificationPanel/dismissAll", async () => {
  const response = await api.put("/api/notification/notifications");
  await response.data;

  return true;
});

export const dismissItem = createAsyncThunk("notificationPanel/dismissItem", async (id) => {
  const response = await api.put(`/api/notification/notifications/${id}`);
  await response.data;

  return id;
});

export const addNotification = createAsyncThunk(
  "notificationPanel/addNotification",
  async (item) => {
    /*     const response = await axios.post(`/api/notifications`, { ...item });
    const data = await response.data; */

    return item;
  }
);

const notificationsAdapter = createEntityAdapter({});

const initialState = notificationsAdapter.upsertMany(notificationsAdapter.getInitialState(), []);

export const { selectAll: selectNotifications, selectById: selectNotificationsById } =
  notificationsAdapter.getSelectors((state) => state.notificationPanel.data);

const dataSlice = createSlice({
  name: "notificationPanel/data",
  initialState,
  reducers: {},
  extraReducers: {
    [dismissItem.fulfilled]: (state, action) =>
      notificationsAdapter.removeOne(state, action.payload),
    [dismissAll.fulfilled]: (state, action) => notificationsAdapter.removeAll(state),
    [getNotifications.fulfilled]: (state, action) =>
      notificationsAdapter.addMany(state, action.payload),
    [addNotification.fulfilled]: (state, action) =>
      notificationsAdapter.addOne(state, action.payload),
  },
});

export default dataSlice.reducer;
