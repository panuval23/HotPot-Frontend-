
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../Interceptors/AuthInterceptor";
import { baseUrl } from "../environment.dev";

export const addReview = createAsyncThunk("reviews/add", async (payload) => {
  const res = await axiosInstance.post(`${baseUrl}User/review/add`, payload);
  return res.data; 
});

const reviewsSlice = createSlice({
  name: "reviews",
  initialState: { reviews: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addReview.fulfilled, (state, action) => {
      state.reviews.push(action.payload);
    });
  },
});

export default reviewsSlice.reducer;
