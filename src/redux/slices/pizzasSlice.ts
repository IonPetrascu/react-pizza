import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';



type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  count: number;
  types: number[];
};
enum Status {
  LOADING = 'loading',
  SUCCES = 'succes',
  ERROR = 'error',
}
export type SearchPizzaParams = {
  pageCount: string;
  categoryId: string;
  orders: string;
  search: string;
  sortProperty: string;
};

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async (params: SearchPizzaParams) => {
    const { pageCount, categoryId, orders, search, sortProperty } = params;
    const { data } = await axios.get(
      `https://659d3c46633f9aee7908fa23.mockapi.io/items?page=${pageCount}&limit=4${
        Number(categoryId) > 0 ? `&category=${categoryId}` : ''
      }&sortBy=${sortProperty.replace('-', '')}&order=${orders}${search}`,
    );
    return data as Pizza[];
  },
);

interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCES;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
