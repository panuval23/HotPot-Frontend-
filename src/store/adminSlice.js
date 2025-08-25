import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AdminService from "../Services/admin.service";
export const fetchRestaurants = createAsyncThunk(
  "admin/fetchRestaurants",
  async ({ pageNumber = 1, pageSize = 10 }) => {
    return await AdminService.getRestaurants(pageNumber, pageSize);
  }
);

export const fetchUsers = createAsyncThunk("admin/fetchUsers", async () => {
  return await AdminService.getUsers();
});

export const addRestaurant = createAsyncThunk(
  "admin/addRestaurant",
  async (data) => {
    return await AdminService.addRestaurant(data);
  }
);

export const updateRestaurant = createAsyncThunk(
  "admin/updateRestaurant",
  async ({ id, data }) => {
    return await AdminService.updateRestaurant(id, data);
  }
);

export const deleteRestaurant = createAsyncThunk(
  "admin/deleteRestaurant",
  async (id) => {
    await AdminService.deleteRestaurant(id);
    return id;
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    restaurants: [],
    totalRestaurants: 0,
    users: [],
    totalUsers: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurants.pending, (s) => {
        s.loading = true;
      })
      .addCase(fetchRestaurants.fulfilled, (s, a) => {
        s.loading = false;
        s.restaurants = a.payload?.restaurants || [];
        s.totalRestaurants = a.payload?.totalNumberOfRecords || 0;
      })
      .addCase(fetchRestaurants.rejected, (s, a) => {
        s.loading = false;
        s.error = a.error.message;
      })
      .addCase(fetchUsers.pending, (s) => {
        s.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (s, a) => {
        s.loading = false;
        s.users = a.payload?.users || [];
        s.totalUsers = a.payload?.totalNumberOfRecords || 0;
      })
      .addCase(fetchUsers.rejected, (s, a) => {
        s.loading = false;
        s.error = a.error.message;
      })
      .addCase(addRestaurant.fulfilled, (s, a) => {
        if (a.payload) {
          s.restaurants.push(a.payload);
          s.totalRestaurants += 1; 
        }
      })
      .addCase(updateRestaurant.fulfilled, (s, a) => {
        if (a.payload) {
          s.restaurants = s.restaurants.map((r) =>
            r.restaurantID === a.payload.restaurantID ? a.payload : r
          );
        }
      })
      .addCase(deleteRestaurant.fulfilled, (s, a) => {
        s.restaurants = s.restaurants.filter(
          (r) => r.restaurantID !== a.payload
        );
        s.totalRestaurants -= 1; 
      });
  },
});

export default adminSlice.reducer;