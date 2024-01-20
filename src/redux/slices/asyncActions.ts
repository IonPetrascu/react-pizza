import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Pizza, SearchPizzaParams } from './pizzas/types';

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
