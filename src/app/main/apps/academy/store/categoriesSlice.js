import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { api } from '../../../../auth/services/api';

export const getCategories = createAsyncThunk('academyApp/categories/getCategories', async () => {
  const response = await api.get('/api/category/');
  const data = await response.data;
  return data;
});

const categoriesAdapter = createEntityAdapter({});

export const { selectAll: selectCategories, selectById: selectCategoryById } =
  categoriesAdapter.getSelectors((state) => state.academyApp.categories);

const categorySlice = createSlice({
  name: 'academyApp/categories',
  initialState: categoriesAdapter.getInitialState({}),
  reducers: {},
  extraReducers: {
    [getCategories.fulfilled]: categoriesAdapter.setAll,
  },
});

export default categorySlice.reducer;
