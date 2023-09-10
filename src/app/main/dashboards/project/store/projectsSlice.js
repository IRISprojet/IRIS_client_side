import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { api } from "src/app/auth/services/api";


export const getProjects = createAsyncThunk(
  'projectDashboardApp/projects/getProjects',
  async (courseId) => {
    const response = await api.get(`/api/Internship/creator/${courseId}`);
    return response.data;
  }
);

const projectsAdapter = createEntityAdapter({});

export const {
  selectAll: selectProjects,
  selectEntities: selectProjectsEntities,
  selectById: selectProjectById,
} = projectsAdapter.getSelectors((state) => state.projectDashboardApp.projects);

const projectsSlice = createSlice({
  name: "projectDashboardApp/projects",
  initialState: projectsAdapter.getInitialState(),
  reducers: {},
  extraReducers: {
    [getProjects.fulfilled]: projectsAdapter.setAll,
  },
});

export default projectsSlice.reducer;
