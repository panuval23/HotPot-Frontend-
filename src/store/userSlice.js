
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../Interceptors/AuthInterceptor";
import { baseUrl } from "../environment.dev";

export const addReview = createAsyncThunk(
  "user/addReview",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(`${baseUrl}User/review/add`, payload);
      return { ...payload, message: res.data.message };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    reviews: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addReview.fulfilled, (state, action) => {
      state.reviews.push(action.payload);
    });
  },
});

export default userSlice.reducer;
