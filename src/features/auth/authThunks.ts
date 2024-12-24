import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Credentials } from '../../types/auth';

// Thunk for logging in the user
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: Credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8050/api/v1/auth/authenticate', credentials);
      toast.success('Login successful');
      return response.data; // Assuming the response contains the token
    } catch (err) {
      toast.error('Login failed');
      return rejectWithValue('Invalid email or password');
    }
  }
);

// Thunk for fetching the authenticated user's information
export const fetchUser = createAsyncThunk(
  'auth/fetchUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:8050/api/v1/user/me', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue('Failed to fetch user data');
    }
  }
);