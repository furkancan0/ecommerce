import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCartItems, addToCart } from './cartThunk';
import { Cart, CartItem } from '../../types/cart';

interface CartState extends Cart {
  loading: boolean;
}

const initialState: CartState = {
  cartItems: JSON.parse(localStorage.getItem('guestCart') || '[]'),
  totalAmount: 0,
  loading: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToGuestCart(state, action: PayloadAction<CartItem>) {
      if (state.cartItems) {
        let isInCart = state.cartItems.find((item) => item.product.id === action.payload.product.id);
        if(isInCart){
          isInCart.quantity++
          isInCart.subTotal = action.payload.unitPrice * isInCart.quantity
        }else{
          state.cartItems.push(action.payload);
        }

        state.totalAmount = state.cartItems.reduce((total,item)=> total+ item.subTotal,0)
        localStorage.setItem('guestCart', JSON.stringify(state.cartItems));
      }
    },
    clearGuestCart(state) {
      state.cartItems = [];
      localStorage.removeItem('guestCart');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCartItems.fulfilled, (state, action:PayloadAction<Cart>) => {
        state.cartItems = action.payload.cartItems;
        state.loading = false;
      })
      .addCase(addToCart.fulfilled, (state, action: PayloadAction<CartItem>) => {
        if (state.cartItems) {
          let isInCart = state.cartItems.find((item) => item.product.id === action.payload.product.id);
          if(isInCart){
            isInCart.quantity++
            isInCart.subTotal = action.payload.unitPrice * isInCart.quantity
          }else{
            state.cartItems.push(action.payload);
          }

          state.totalAmount = state.cartItems.reduce((total,item)=> total+ item.subTotal,0)

        }
      })
  },
});
export const { addToGuestCart, clearGuestCart } = cartSlice.actions;
export default cartSlice.reducer;