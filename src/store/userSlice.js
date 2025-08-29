
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../Interceptors/AuthInterceptor";
import { baseUrl } from "../environment.dev";


export const fetchRestaurants = createAsyncThunk(
  "user/fetchRestaurants",
  async ({ pageNumber = 1, pageSize = 10 }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(
        `${baseUrl}User/GetAllRestaurants?pageNumber=${pageNumber}&pageSize=${pageSize}`
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


export const fetchMenu = createAsyncThunk(
  "user/fetchMenu",
  async (params, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`${baseUrl}User/menu`, { params });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


export const searchMenuItems = createAsyncThunk(
  "user/searchMenuItems",
  async ({ searchTerm, pageNumber = 1, pageSize = 10 }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(
        `${baseUrl}User/menu/search?searchTerm=${searchTerm}&pageNumber=${pageNumber}&pageSize=${pageSize}`
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


export const fetchMenuItemDetails = createAsyncThunk(
  "user/fetchMenuItemDetails",
  async (menuItemId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`${baseUrl}User/menu/${menuItemId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ restaurantId, menuItemId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/User/cart/add", {
        restaurantID: restaurantId,   
        menuItemID: menuItemId,       
        quantity: quantity
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error adding to cart");
    }
  }
);



export const fetchCart = createAsyncThunk(
  "user/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`${baseUrl}User/cart`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


export const updateCartItem = createAsyncThunk(
  "user/updateCartItem",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(`${baseUrl}User/cart/update`, payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


export const removeCartItem = createAsyncThunk(
  "user/removeCartItem",
  async (cartId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`${baseUrl}User/cart/remove/${cartId}`);
      return cartId; 
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const checkout = createAsyncThunk(
  "user/checkout",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(`${baseUrl}User/cart/checkout`, payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

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
    restaurants: [],
    menu: [],
    searchResults: [],
    menuItem: null,
    cart: [],
    reviews: [],
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.restaurants = action.payload.items || [];
      })
     
      .addCase(fetchMenu.fulfilled, (state, action) => {
        state.menu = action.payload.items || [];
      })
     
      .addCase(searchMenuItems.fulfilled, (state, action) => {
        state.searchResults = action.payload.items || [];
      })
 
      .addCase(fetchMenuItemDetails.fulfilled, (state, action) => {
        state.menuItem = action.payload;
      })

      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cart = action.payload.items || [];
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart.push(action.payload);
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        const idx = state.cart.findIndex((c) => c.cartID === action.payload.cartID);
        if (idx !== -1) state.cart[idx] = action.payload;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.cart = state.cart.filter((c) => c.cartID !== action.payload);
      })
      .addCase(checkout.fulfilled, (state, action) => {
        state.orders.push(action.payload.order);
        state.cart = []; 
      })
      
      .addCase(addReview.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
      });
  },
});

export default userSlice.reducer;
