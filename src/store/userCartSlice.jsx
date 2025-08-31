
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartService from "../Services/cart.service";


export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      return await cartService.getCart();
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.Message || err.message || "Failed to fetch cart"
      );
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (dto, { rejectWithValue }) => {
    try {
      return await cartService.addItem(dto); 
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.Message || err.message || "Failed to add to cart"
      );
    }
  }
);

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async (dto, { rejectWithValue }) => {
    try {
      return await cartService.updateItem(dto); 
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.Message || err.message || "Failed to update cart item"
      );
    }
  }
);

export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (cartId, { rejectWithValue }) => {
    try {
      return await cartService.removeItem(cartId);
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.Message || err.message || "Failed to remove cart item"
      );
    }
  }
);

export const checkoutCart = createAsyncThunk(
  "cart/checkoutCart",
  async (dto, { rejectWithValue }) => {
    try {
      return await cartService.checkout(dto); 
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.Message || err.message || "Failed to checkout"
      );
    }
  }
);


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
    builder
    
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload || {};
        state.items = payload.items || [];
        state.totalCost = payload.totalCost || 0;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addToCart.fulfilled, (state, action) => {
        const payload = action.payload || {};
        state.items = payload.items || [];
        state.totalCost = payload.totalCost || 0;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.error = action.payload;
      })

    
      .addCase(updateCartItem.fulfilled, (state, action) => {
        const updatedItem = action.meta.arg; 
        const itemIndex = state.items.findIndex(
          (i) => i.cartID === updatedItem.cartId
        );

        if (itemIndex !== -1) {
          state.items[itemIndex].quantity = updatedItem.quantity;
          state.items[itemIndex].subtotal =
            state.items[itemIndex].finalPrice * updatedItem.quantity;

          state.totalCost = state.items.reduce((sum, i) => sum + i.subtotal, 0);
        }
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.error = action.payload;
      })

     
      .addCase(removeCartItem.fulfilled, (state, action) => {
        const cartId = action.meta.arg;
        state.items = state.items.filter((i) => i.cartID !== cartId);
        state.totalCost = state.items.reduce((sum, i) => sum + i.subtotal, 0);
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.error = action.payload;
      })

   
      .addCase(checkoutCart.fulfilled, (state) => {
        state.items = [];
        state.totalCost = 0;
      })
      .addCase(checkoutCart.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});


export const { clearCartState } = userCartSlice.actions;
export default userCartSlice.reducer;
