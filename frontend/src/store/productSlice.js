import { createSlice } from '@reduxjs/toolkit';

// A Redux slice to manage product-related state.
const productSlice = createSlice({
  name: 'products',
  initialState: {
    searchQuery: '', //State to store the user's search input text.
  },
  reducers: {
    //Reducer function to update the search query in the state.
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { setSearchQuery } = productSlice.actions;
export const selectSearchQuery = (state) => state.products.searchQuery;
export default productSlice.reducer;