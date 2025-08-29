
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartService from "../Services/cart.service";


export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  return await cartService.getCart();
});

export const addToCart = createAsyncThunk("cart/addToCart", async (dto) => {
  return await cartService.addItem(dto);
});

export const updateCartItem = createAsyncThunk("cart/updateCartItem", async (dto) => {
  return await cartService.updateItem(dto);
});

export const removeCartItem = createAsyncThunk("cart/removeCartItem", async (cartId) => {
  return await cartService.removeItem(cartId);
});

export const checkoutCart = createAsyncThunk("cart/checkoutCart", async (dto) => {
  return await cartService.checkout(dto);
});


const userCartSlice = createSlice({
  name: "userCart",
  initialState: {
    items: [],
    totalCost: 0,
    loading: false,
    error: null,
  },
  reducers: {
    clearCartState: (state) => {
      state.items = [];
      state.totalCost = 0;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    const handleCartUpdate = (state, action) => {
      const payload = action.payload || {};
      state.items = payload.items || [];
      state.totalCost = payload.totalCost || 0;
    };

    builder
      .addCase(fetchCart.fulfilled, handleCartUpdate)
      .addCase(addToCart.fulfilled, handleCartUpdate)
      .addCase(updateCartItem.fulfilled, handleCartUpdate)
      .addCase(removeCartItem.fulfilled, handleCartUpdate)
      .addCase(checkoutCart.fulfilled, (state) => {
        state.items = [];
        state.totalCost = 0;
      });
  },
});

export const { clearCartState } = userCartSlice.actions;
export default userCartSlice.reducer;
