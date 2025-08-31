
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRestaurantReviews } from "../Services/review.service";
export const fetchReviews = createAsyncThunk(
  "restaurantReviews/fetchReviews",
  async (_, { rejectWithValue }) => {
    try {
      return await getRestaurantReviews();
    } catch (err) {
      return rejectWithValue(err.response?.data?.Message || "Failed to load reviews");
    }
  }
);

const restaurantReviewsSlice = createSlice({
  name: "restaurantReviews",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default restaurantReviewsSlice.reducer;
