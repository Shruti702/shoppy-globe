import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import productReducer from './productSlice';

//The global Redux store using configureStore.
export const store = configureStore({
  reducer: {
    //'cart' will hold the state managed by cartReducer.
    cart: cartReducer,
    //'products' will hold the state managed by productReducer.
    products: productReducer,
  },
});