import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product } from '../../types/product';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (_, { rejectWithValue }) => {
  try {
      const token = localStorage.getItem('token');

      // Set up headers, including Authorization if token exists
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await axios.get<Product[]>('http://localhost:8050/api/v1/products', { headers });
      return response.data;
  } catch (error) {
      return rejectWithValue('Failed to fetch products');
  }

});