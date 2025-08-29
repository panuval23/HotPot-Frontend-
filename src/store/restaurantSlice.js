
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../Interceptors/AuthInterceptor";
import { baseUrl } from "../environment.dev";

export const fetchRestaurants = createAsyncThunk(
  "restaurants/fetchAll",
  async ({ pageNumber = 1, pageSize = 10 }) => {
    const res = await axiosInstance.get(
      `${baseUrl}User/GetAllRestaurants?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    return res.data; 
  }
);

const restaurantSlice = createSlice({
  name: "restaurants",
  initialState: { items: [], totalCount: 0, status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items =
          action.payload.items || action.payload.restaurants || [];
        state.totalCount =
          action.payload.totalCount ||
          action.payload.totalNumberOfRecords ||
          0;
      })
      
  },
});

export default restaurantSlice.reducer;
