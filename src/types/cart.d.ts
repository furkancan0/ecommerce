import { Product } from './product';

export interface CartItem {
  id: number;
  quantity: number;
  unitPrice:number;
  subTotal:number;
  product:Product
}

export interface Cart {
  cartItems: CartItem[];
  totalAmount: number;
}