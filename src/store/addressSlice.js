import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import addressService from "../Services/addressService";

export const fetchAddresses = createAsyncThunk("address/fetchAll", async () => {
  return await addressService.getAll();
});

export const createAddress = createAsyncThunk("address/create", async (address) => {
  return await addressService.add(address);
});

const addressSlice = createSlice({
  name: "address",
  initialState: { items: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddresses.pending, (state) => { state.status = "loading"; })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createAddress.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export default addressSlice.reducer;

