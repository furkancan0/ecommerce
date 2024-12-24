import { createSlice } from '@reduxjs/toolkit';
import { fetchProducts } from './productsThunk';
import { Product } from '../../types/product';
interface ProductsState {
  products: Product[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: ProductsState = {
  products: [],
  status: 'idle',
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.status = 'idle';
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default productsSlice.reducer;