
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AdminService from "../Services/admin.service";


export const fetchRestaurants = createAsyncThunk(
  "admin/fetchRestaurants",
  async ({ pageNumber = 1, pageSize = 10 } = {}, { rejectWithValue }) => {
    try {
      const res = await AdminService.getRestaurants(pageNumber, pageSize);
      return {
        restaurants: res.restaurants ?? res.Restaurants ?? [],
        total: res.totalNumberOfRecords ?? res.TotalNumberOfRecords ?? 0,
        pageNumber: res.pageNumber ?? res.PageNumber ?? pageNumber,
      };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


export const fetchUsers = createAsyncThunk(
  "admin/fetchUsers",
  async ({ pageNumber = 1, pageSize = 10 } = {}, { rejectWithValue }) => {
    try {
      const res = await AdminService.getUsers(pageNumber, pageSize);
      return {
        users: res.users ?? res.Users ?? [],
        total: res.totalNumberOfRecords ?? res.TotalNumberOfRecords ?? 0,
        pageNumber: res.pageNumber ?? res.PageNumber ?? pageNumber,

       
        activeUsers: res.activeUsers ?? res.ActiveUsers ?? 0,
        inactiveUsers: res.inactiveUsers ?? res.InactiveUsers ?? 0,
      };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);



export const addRestaurant = createAsyncThunk(
  "admin/addRestaurant",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const res = await AdminService.addRestaurant(data);
    
      await dispatch(fetchRestaurants({ pageNumber: 1, pageSize: 10 }));
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


export const updateRestaurant = createAsyncThunk(
  "admin/updateRestaurant",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await AdminService.updateRestaurant(id, data);
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


export const deleteRestaurant = createAsyncThunk(
  "admin/deleteRestaurant",
  async (id, { rejectWithValue }) => {
    try {
      await AdminService.deleteRestaurant(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      await AdminService.deleteUser(id); 
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


const normalizeRestaurant = (r) => ({
  ...r,
  restaurantID: r.restaurantID ?? r.RestaurantID,
  restaurantName: r.restaurantName ?? r.RestaurantName,
  ownerName: r.ownerName ?? r.OwnerName,
  location: r.location ?? r.Location,
  isActive: Boolean(r.isActive ?? r.IsActive ?? 0),
});

const normalizeUser = (u) => ({
  ...u,
  userID: u.userID ?? u.UserID,
  username: u.username ?? u.Username,
  contactNumber: u.contactNumber ?? u.ContactNumber,
  isActive: Boolean(u.isActive ?? u.IsActive ?? 0),
  addresses: u.addresses ?? u.Addresses ?? [],
});


const adminSlice = createSlice({
  name: "admin",
  initialState: {
    restaurants: [],
    users: [],
    loading: false,
    error: null,
    totalRestaurants: 0,
    totalUsers: 0,
    restaurantsPage: 1,
    usersPage: 1,
    pageSize: 10,
   
  },
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
  
      .addCase(fetchRestaurants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurants = action.payload.restaurants.map(normalizeRestaurant);
        state.totalRestaurants = action.payload.total;
        state.restaurantsPage = action.payload.pageNumber;
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

    
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users.map(normalizeUser);
        state.totalUsers = action.payload.total;
        state.usersPage = action.payload.pageNumber;
      
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

   
      .addCase(addRestaurant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addRestaurant.fulfilled, (state) => {
        state.loading = false;
       
      })
      .addCase(addRestaurant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      .addCase(updateRestaurant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRestaurant.fulfilled, (state, action) => {
        state.loading = false;
        const updated = normalizeRestaurant(action.payload);
        const idx = state.restaurants.findIndex(
          (r) => r.restaurantID === updated.restaurantID
        );
        if (idx !== -1) {
          state.restaurants[idx] = { ...state.restaurants[idx], ...updated };
        }
      })
      .addCase(updateRestaurant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

    
      .addCase(deleteRestaurant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRestaurant.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.payload;
        state.restaurants = state.restaurants.filter(
          (r) => r.restaurantID !== id
        );
        state.totalRestaurants = Math.max(0, state.totalRestaurants - 1);
      })
      .addCase(deleteRestaurant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

     
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.payload;
        const user = state.users.find((u) => u.userID === id);
        if (user) {
          user.isActive = false;  
        }
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
      
  },
});

export const { clearError } = adminSlice.actions;
export default adminSlice.reducer;
