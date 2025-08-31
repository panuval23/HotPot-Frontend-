
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addDiscount } from "../Services/discount.service";

export const createDiscount = createAsyncThunk(
  "discount/createDiscount",
  async (dto, { rejectWithValue }) => {
    try {
      return await addDiscount(dto);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Error adding discount");
    }
  }
);

const discountSlice = createSlice({
  name: "discount",
  initialState: { loading: false, success: null, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createDiscount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDiscount.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
      })
      .addCase(createDiscount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default discountSlice.reducer;
