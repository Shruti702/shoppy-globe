import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], //Array to hold cart items.
  },
  reducers: {
    //Action to add an item to the cart.
    addToCart: (state, action) => {
      //Checks if the item already exists in the cart to avoid duplicates.
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1; //If item exists, just increment its quantity.
      } else {
        state.items.push({ ...action.payload, quantity: 1 }); //If item is new, add it to the array with a starting quantity of 1.
      }
    },
    //Action to remove an item by its ID.
    removeFromCart: (state, action) => {
      //Filter returns a new array excluding the item with the matching ID.
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    //Action to increase or decrease item quantity.
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        //Ensure quantity never goes below 1.
        item.quantity = Math.max(1, quantity);
      }
    },
    //Action to empty the cart.
    clearCart: (state) => {
      state.items = [];
    }
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export const selectCartItems = (state) => state.cart.items;
export default cartSlice.reducer;