
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCurrentOrders,
  getOrderHistory,
  updateOrderStatus,
} from "../Services/order.service";

export const fetchCurrentOrders = createAsyncThunk(
  "restaurantOrders/fetchCurrent",
  async (_, { rejectWithValue }) => {
    try {
      return await getCurrentOrders();
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.Message || "Failed to load current orders"
      );
    }
  }
);

export const fetchOrderHistory = createAsyncThunk(
  "restaurantOrders/fetchHistory",
  async (_, { rejectWithValue }) => {
    try {
      return await getOrderHistory();
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.Message || "Failed to load order history"
      );
    }
  }
);


export const changeOrderStatus = createAsyncThunk(
  "restaurantOrders/changeStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      return await updateOrderStatus(id, status);
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.Message || "Failed to update order status"
      );
    }
  }
);

const restaurantOrderSlice = createSlice({
  name: "restaurantOrders",
  initialState: {
    currentOrders: null,
    history: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      
      .addCase(fetchCurrentOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrders = action.payload;
      })
      .addCase(fetchCurrentOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      
      .addCase(fetchOrderHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.history = action.payload;
      })
      .addCase(fetchOrderHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

    
      .addCase(changeOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload.updatedOrder;

        if (state.currentOrders?.items) {
        
          if (
            updated.status === "Delivered" ||
            updated.status === "Cancelled"
          ) {
            state.currentOrders.items = state.currentOrders.items.filter(
              (o) => o.orderID !== updated.orderID
            );

            if (!state.history) {
              state.history = { items: [] };
            }
            state.history.items = [updated, ...(state.history.items || [])];
          } else {
        
            state.currentOrders.items = state.currentOrders.items.map((o) =>
              o.orderID === updated.orderID ? updated : o
            );
          }
        }
      })
      .addCase(changeOrderStatus.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default restaurantOrderSlice.reducer;
