import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params,thunkApi) => {
  const { pageCount, categoryId, orders, search, sortType } = params;
  const { data } = await axios.get(
    `https://659d3c46633f9aee7908fa23.mockapi.io/items?page=${pageCount}&limit=4${
      categoryId > 0 ? `&category=${categoryId}` : ''
    }&sortBy=${sortType.replace('-', '')}&order=${orders}${search}`,
  );
  return data;
});

const initialState = {
  items: [],
  status: 'loading', //loading \ succes | error
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = 'loading';
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state,action) => {
      state.items = action.payload;
      state.status = 'succes';
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = 'error';
      state.items = [];
    });
  },
});

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
