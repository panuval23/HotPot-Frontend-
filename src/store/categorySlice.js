// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { categoryService } from "../Services/category.service";
// export const fetchCategories = createAsyncThunk("categories/fetchAll", async () => {
//     const res = await categoryService.getAll();
//     console.log("📦 Categories API response:", res);
//     return res;
//   });
// export const addCategory = createAsyncThunk("categories/add", async (dto) => {
//   return await categoryService.add(dto);
// });

// export const updateCategory = createAsyncThunk("categories/update", async ({ id, dto }) => {
//   return await categoryService.update(id, dto);
// });

// export const deleteCategory = createAsyncThunk("categories/delete", async (id) => {
//   await categoryService.delete(id);
//   return id;
// });
// const categorySlice = createSlice({
//   name: "categories",
//   initialState: {
//     list: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//   .addCase(fetchCategories.fulfilled, (state, action) => {
//         state.loading = false;
      
    
//         if (Array.isArray(action.payload)) {
//           state.list = action.payload;
      
//         } else if (action.payload.items) {
//           state.list = action.payload.items;
   
//         } else {
//           state.list = [];
//         }
//       })
      


//       .addCase(addCategory.fulfilled, (state, action) => {
//         state.list.push(action.payload);
//       })

   
//       .addCase(updateCategory.fulfilled, (state, action) => {
//         const index = state.list.findIndex(c => c.categoryID === action.payload.categoryID);
//         if (index !== -1) state.list[index] = action.payload;
//       })

//       .addCase(deleteCategory.fulfilled, (state, action) => {
//         state.list = state.list.filter(c => c.categoryID !== action.payload);
//       });
//   },
// });

// export default categorySlice.reducer;


// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { categoryService } from "../Services/category.service";

// // 🔹 Fetch all categories
// export const fetchCategories = createAsyncThunk(
//   "categories/fetchAll",
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await categoryService.getAll();
//       console.log("📦 Categories API response:", res);
//       return res;
//     } catch (err) {
//       return rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// // 🔹 Add new category
// export const addCategory = createAsyncThunk(
//   "categories/add",
//   async (dto, { rejectWithValue }) => {
//     try {
//       return await categoryService.add(dto);
//     } catch (err) {
//       return rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// // 🔹 Update category
// export const updateCategory = createAsyncThunk(
//   "categories/update",
//   async ({ id, dto }, { rejectWithValue }) => {
//     try {
//       return await categoryService.update(id, dto);
//     } catch (err) {
//       return rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// // 🔹 Delete category
// export const deleteCategory = createAsyncThunk(
//   "categories/delete",
//   async (id, { rejectWithValue }) => {
//     try {
//       await categoryService.delete(id);
//       return id;
//     } catch (err) {
//       return rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// const categorySlice = createSlice({
//   name: "categories",
//   initialState: {
//     list: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     // ✅ Reset action (useful on logout)
//     resetCategories: (state) => {
//       state.list = [];
//       state.loading = false;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // 🔹 Fetch
//       .addCase(fetchCategories.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchCategories.fulfilled, (state, action) => {
//         state.loading = false;
//         if (Array.isArray(action.payload)) {
//           state.list = action.payload;
//         } else if (action.payload?.items) {
//           state.list = action.payload.items;
//         } else {
//           state.list = [];
//         }
//       })
//       .addCase(fetchCategories.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // 🔹 Add
//       .addCase(addCategory.fulfilled, (state, action) => {
//         state.list.push(action.payload);
//       })

//       // 🔹 Update
//       .addCase(updateCategory.fulfilled, (state, action) => {
//         const index = state.list.findIndex(
//           (c) => c.categoryID === action.payload.categoryID
//         );
//         if (index !== -1) state.list[index] = action.payload;
//       })

//       // 🔹 Delete
//       .addCase(deleteCategory.fulfilled, (state, action) => {
//         state.list = state.list.filter((c) => c.categoryID !== action.payload);
//       });
//   },
// });

// export const { resetCategories } = categorySlice.actions;
// export default categorySlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { categoryService } from "../Services/category.service";

// ✅ Fetch categories for current restaurant
export const fetchCategories = createAsyncThunk(
  "categories/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await categoryService.getAll();
      console.log("📦 Categories API response:", res);
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch categories");
    }
  }
);

export const addCategory = createAsyncThunk("categories/add", async (dto, { rejectWithValue }) => {
  try {
    return await categoryService.add(dto);
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Failed to add category");
  }
});

export const updateCategory = createAsyncThunk(
  "categories/update",
  async ({ id, dto }, { rejectWithValue }) => {
    try {
      return await categoryService.update(id, dto);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update category");
    }
  }
);

export const deleteCategory = createAsyncThunk("categories/delete", async (id, { rejectWithValue }) => {
  try {
    await categoryService.delete(id);
    return id;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Failed to delete category");
  }
});

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    // ✅ Reset on logout (so categories of old restaurant don’t leak)
    resetCategories: (state) => {
      state.list = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;

        // Normalize response
        if (Array.isArray(action.payload)) {
          state.list = action.payload;
        } else if (action.payload?.items && Array.isArray(action.payload.items)) {
          state.list = action.payload.items;
        } else {
          state.list = []; // ✅ fallback for { message: "No categories found" }
        }
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.list = [];
      })

      // Add category
      .addCase(addCategory.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })

      // Update category
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.list.findIndex((c) => c.categoryID === action.payload.categoryID);
        if (index !== -1) state.list[index] = action.payload;
      })

      // Delete category
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.list = state.list.filter((c) => c.categoryID !== action.payload);
      });
  },
});

export const { resetCategories } = categorySlice.actions;
export default categorySlice.reducer;
