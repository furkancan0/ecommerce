import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Cart, CartItem } from '../../types/cart';
import { getTempCartId } from '../../utils/cartUtils';
export const fetchCartItems = createAsyncThunk('cart/fetchCartItems', async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    // Set up headers, including Authorization if token exists
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await axios.get<Cart>('http://localhost:8060/api/v1/carts/1',{ headers});
  return response.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const addToCart = createAsyncThunk('cart/addToCart', async (productId: number,{ rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');

    // Set up headers, including Authorization if token exists
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await axios.post<CartItem>(`http://localhost:8060/api/v1/carts/1/${productId}/1`, null,{ headers });
    return response.data;
  } catch (error) {
    return rejectWithValue('Failed');
  }
});