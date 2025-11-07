import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  total: 0,
  totalItems: 0,
  loading: false,    
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setCart: (state, action) => {
      state.cart = action.payload.courses;
      state.total = action.payload.totalPrice;
      state.totalItems = action.payload.totalItems;
      state.loading = false;          
    },
    resetCart: (state) => {
      state.cart = [];
      state.total = 0;
      state.totalItems = 0;
      state.loading = false;
    },
  },
});

export const { setCart, resetCart, setLoading } = cartSlice.actions;
export default cartSlice.reducer;
