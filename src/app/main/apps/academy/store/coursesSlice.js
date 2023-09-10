import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { api } from "src/app/auth/services/api";

export const getCourses = createAsyncThunk(
  "academyApp/courses/getCourses",
  async (type) => {
    console.log("getCourses: type=", type);
    const response = await api.get("/api/Internship/type/" + type);
    const data = await response.data;
    console.log("getCourses: data=", data);
    return data;
  }
);
const coursesAdapter = createEntityAdapter();

export const { selectAll: selectCourses, selectById: selectCourseById } =
  coursesAdapter.getSelectors((state) => state.academyApp.courses);

const coursesSlice = createSlice({
  name: "academyApp/courses",
  initialState: coursesAdapter.getInitialState({}),
  reducers: {},
  extraReducers: {
    [getCourses.fulfilled]: coursesAdapter.setAll,
  },
});

export default coursesSlice.reducer;
