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
      const res = await getCurrentOrders();
      console.log("📦 Current Orders API response:", res);
      return res;
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
      const res = await getOrderHistory();
      console.log("📦 Order History API response:", res);
      return res;
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

const initialState = {
  currentOrders: { items: [] }, 
  history: { items: [] },       
  loading: false,
  error: null,
};

const restaurantOrderSlice = createSlice({
  name: "restaurantOrders",
  initialState,
  reducers: {
    resetOrders: () => initialState, 
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(fetchCurrentOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentOrders.fulfilled, (state, action) => {
        state.loading = false;

        
        if (Array.isArray(action.payload)) {
          state.currentOrders = { items: action.payload };
        } else if (action.payload?.items && Array.isArray(action.payload.items)) {
          state.currentOrders = { items: action.payload.items };
        } else {
          state.currentOrders = { items: [] };
        }
      })
      .addCase(fetchCurrentOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.currentOrders = { items: [] };
      })

      
      .addCase(fetchOrderHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderHistory.fulfilled, (state, action) => {
        state.loading = false;

        if (Array.isArray(action.payload)) {
          state.history = { items: action.payload };
        } else if (action.payload?.items && Array.isArray(action.payload.items)) {
          state.history = { items: action.payload.items };
        } else {
          state.history = { items: [] };
        }
      })
      .addCase(fetchOrderHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.history = { items: [] };
      })

      
      .addCase(changeOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload.updatedOrder;

        if (state.currentOrders?.items?.length) {
          if (
            updated.status === "Delivered" ||
            updated.status === "Cancelled"
          ) {
            state.currentOrders.items = state.currentOrders.items.filter(
              (o) => o.orderID !== updated.orderID
            );

            if (!state.history) state.history = { items: [] };
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

export const { resetOrders } = restaurantOrderSlice.actions;
export default restaurantOrderSlice.reducer;
