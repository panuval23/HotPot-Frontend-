import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../Interceptors/AuthInterceptor"; 
export const fetchUserOrders = createAsyncThunk(
  "order/fetchUserOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("User/orders"); 
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to load orders");
    }
  }
);

export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await api.post("/User/cart/checkout", orderData); 
      return response.data.order; 
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to place order");
    }
  }
);


const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    lastOrder: null,
    status: "idle",
    error: null,
  },
  reducers: {
    setLastOrder: (state, action) => {
      state.lastOrder = action.payload; 
    },
    clearLastOrder: (state) => {
      state.lastOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
  
        state.lastOrder = action.payload;
        state.orders.unshift(action.payload); 
      });
  },
});

export const { setLastOrder, clearLastOrder } = orderSlice.actions;
export default orderSlice.reducer;