import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { showMessage } from "app/store/fuse/messageSlice";
import { api } from "src/app/auth/services/api";

export const getCourse = createAsyncThunk(
  "academyApp/course/getCourse",
  async (courseId) => {
    const response = await api.get(`/api/course/${courseId}`);

    const data = await response.data;
    console.log(data);
    return data;
  }
);

export const updateCourse = createAsyncThunk(
  "academyApp/course/updateCourse",
  async (_data, { getState, dispatch }) => {
    const { _id } = getState().academyApp.course;

    const response = await api.put(`/api/course/${_id}`, _data);

    const data = await response.data;

    dispatch(showMessage({ message: "Course Saved" }));

    return data;
  }
);

export const applyToInternship = createAsyncThunk(
  "academyApp/course/apply",
  async (_data, { getState, dispatch }) => {
    const { _id } = getState().academyApp.course;

    const response = await api.post(`/api/applied/${_id}`, _data);

    const data = await response.data;

    dispatch(showMessage({ message: "applied to internship saved Saved" }));

    return data;
  }
);

const courseSlice = createSlice({
  name: "academyApp/course",
  initialState: null,
  reducers: {},
  extraReducers: {
    [getCourse.fulfilled]: (state, action) => action.payload,
    [updateCourse.fulfilled]: (state, action) => action.payload,
  },
});

export const selectCourse = ({ academyApp }) => academyApp.course;

export default courseSlice.reducer;
