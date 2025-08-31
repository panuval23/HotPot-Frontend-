
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../Interceptors/AuthInterceptor";
import { baseUrl } from "../environment.dev";


export const fetchMenu = createAsyncThunk(
  "userMenu/fetchMenu",
  async ({ restaurantId, categoryName, isVeg, minPrice, maxPrice, pageNumber = 1, pageSize = 10 }) => {
    const response = await axiosInstance.get(`${baseUrl}User/menu`, {
      params: { restaurantId, categoryName, isVeg, minPrice, maxPrice, pageNumber, pageSize },
    });
    return response.data;
  }
);


export const searchMenuItems = createAsyncThunk(
  "userMenu/search",
  async ({ searchTerm, pageNumber = 1, pageSize = 10 }) => {
    const res = await axiosInstance.get(`${baseUrl}User/menu/search`, {
      params: { searchTerm, pageNumber, pageSize },
    });
    return res.data;
  }
);


export const fetchMenuItemDetails = createAsyncThunk("userMenu/details", async (menuItemId) => {
  const res = await axiosInstance.get(`${baseUrl}User/menu/${menuItemId}`);
  return res.data;
});

const userMenuSlice = createSlice({
  name: "userMenu",
  initialState: {
    items: [],
    searchResults: [],
    selectedItem: null,
    totalCount: 0,
    status: "idle",
    error: null,
  },
  reducers: {
    clearSelectedItem: (state) => {
      state.selectedItem = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenu.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMenu.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.items || [];
        state.totalCount = action.payload.totalCount || 0;
      })
      .addCase(fetchMenu.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(searchMenuItems.fulfilled, (state, action) => {
        state.searchResults = action.payload.items || [];
      })
      .addCase(fetchMenuItemDetails.fulfilled, (state, action) => {
        state.selectedItem = action.payload;
      });
  },
});

export const { clearSelectedItem } = userMenuSlice.actions;
export default userMenuSlice.reducer;
