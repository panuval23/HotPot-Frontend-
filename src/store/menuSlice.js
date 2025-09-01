// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { menuService } from "../Services/menu.service";


// export const fetchMenuItems = createAsyncThunk("menu/fetchAll", async ({ page = 1, size = 10 }) => {
//   return await menuService.getAll(page, size);
// });

// export const fetchMenuItemById = createAsyncThunk("menu/fetchById", async (id) => {
//   return await menuService.getById(id);
// });

// export const addMenuItem = createAsyncThunk("menu/add", async (dto) => {
//   return await menuService.add(dto);
// });

// export const updateMenuItem = createAsyncThunk("menu/update", async ({ id, dto }) => {
//   return await menuService.update(id, dto);
// });

// export const deleteMenuItem = createAsyncThunk("menu/delete", async (id) => {
//   await menuService.delete(id);
//   return id;
// });


// const menuSlice = createSlice({
//   name: "menu",
//   initialState: {
//     list: [],
//     selected: null,
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
      
//       .addCase(fetchMenuItems.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchMenuItems.fulfilled, (state, action) => {
//         state.loading = false;

//         if (Array.isArray(action.payload)) {
//           state.list = action.payload;
//         } else if (action.payload.items) {
//           state.list = action.payload.items;
//         } else {
//           state.list = [];
//         }
//       })
//       .addCase(fetchMenuItems.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })

   
//       .addCase(fetchMenuItemById.fulfilled, (state, action) => {
//         state.selected = action.payload;
//       })

   
//       .addCase(addMenuItem.fulfilled, (state, action) => {
//         state.list.push(action.payload);
//       })


//       .addCase(updateMenuItem.fulfilled, (state, action) => {
//         const index = state.list.findIndex(m => m.menuItemID === action.payload.menuItemID);
//         if (index !== -1) state.list[index] = action.payload;
//       })

     
//       .addCase(deleteMenuItem.fulfilled, (state, action) => {
//         state.list = state.list.filter(m => m.menuItemID !== action.payload);
//       });
//   },
// });

// export default menuSlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { menuService } from "../Services/menu.service";

// // 🔹 Thunks
// export const fetchMenuItems = createAsyncThunk(
//   "menu/fetchAll",
//   async ({ page = 1, size = 10 }, { rejectWithValue }) => {
//     try {
//       return await menuService.getAll(page, size); // expect { items, totalCount }
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || "Error fetching menu items");
//     }
//   }
// );

// export const fetchMenuItemById = createAsyncThunk(
//   "menu/fetchById",
//   async (id, { rejectWithValue }) => {
//     try {
//       return await menuService.getById(id);
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || "Error fetching menu item");
//     }
//   }
// );

// export const addMenuItem = createAsyncThunk(
//   "menu/add",
//   async (dto, { rejectWithValue }) => {
//     try {
//       return await menuService.add(dto);
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || "Error adding menu item");
//     }
//   }
// );

// export const updateMenuItem = createAsyncThunk(
//   "menu/update",
//   async ({ id, dto }, { rejectWithValue }) => {
//     try {
//       return await menuService.update(id, dto);
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || "Error updating menu item");
//     }
//   }
// );

// export const deleteMenuItem = createAsyncThunk(
//   "menu/delete",
//   async (id, { rejectWithValue }) => {
//     try {
//       await menuService.delete(id);
//       return id;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || "Error deleting menu item");
//     }
//   }
// );

// // 🔹 Slice
// const menuSlice = createSlice({
//   name: "menu",
//   initialState: {
//     list: [],
//     selected: null,
//     loading: false,
//     error: null,
//     success: null,
//     totalCount: 0,
//   },
//   reducers: {
//     resetMenuState: (state) => {
//       state.loading = false;
//       state.error = null;
//       state.success = null;
//       state.selected = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Fetch All
//       .addCase(fetchMenuItems.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.success = null;
//       })
//       .addCase(fetchMenuItems.fulfilled, (state, action) => {
//         state.loading = false;
//         if (Array.isArray(action.payload)) {
//           state.list = action.payload;
//           state.totalCount = action.payload.length;
//         } else {
//           state.list = action.payload.items || [];
//           state.totalCount = action.payload.totalCount || 0;
//         }
//       })
//       .addCase(fetchMenuItems.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Fetch by ID
//       .addCase(fetchMenuItemById.fulfilled, (state, action) => {
//         state.selected = action.payload;
//       })
//       .addCase(fetchMenuItemById.rejected, (state, action) => {
//         state.error = action.payload;
//       })

//       // Add
//       .addCase(addMenuItem.fulfilled, (state, action) => {
//         state.list.push(action.payload);
//         state.success = "Menu item added successfully";
//       })
//       .addCase(addMenuItem.rejected, (state, action) => {
//         state.error = action.payload;
//       })

//       // Update
//       .addCase(updateMenuItem.fulfilled, (state, action) => {
//         const index = state.list.findIndex(m => m.menuItemID === action.payload.menuItemID);
//         if (index !== -1) state.list[index] = action.payload;
//         state.success = "Menu item updated successfully";
//       })
//       .addCase(updateMenuItem.rejected, (state, action) => {
//         state.error = action.payload;
//       })

//       // Delete
//       .addCase(deleteMenuItem.fulfilled, (state, action) => {
//         state.list = state.list.filter(m => m.menuItemID !== action.payload);
//         state.success = "Menu item deleted successfully";
//       })
//       .addCase(deleteMenuItem.rejected, (state, action) => {
//         state.error = action.payload;
//       });
//   },
// });

// export const { resetMenuState } = menuSlice.actions;
// export default menuSlice.reducer;


// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { menuService } from "../Services/menu.service";

// // ✅ Fetch menu items for current restaurant
// export const fetchMenuItems = createAsyncThunk(
//   "menu/fetchAll",
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await menuService.getAll();
//       console.log("📦 Menu API response:", res);
//       return res;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || "Failed to fetch menu items");
//     }
//   }
// );

// export const addMenuItem = createAsyncThunk("menu/add", async (dto, { rejectWithValue }) => {
//   try {
//     return await menuService.add(dto);
//   } catch (err) {
//     return rejectWithValue(err.response?.data?.message || "Failed to add menu item");
//   }
// });

// export const updateMenuItem = createAsyncThunk(
//   "menu/update",
//   async ({ id, dto }, { rejectWithValue }) => {
//     try {
//       return await menuService.update(id, dto);
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || "Failed to update menu item");
//     }
//   }
// );

// export const deleteMenuItem = createAsyncThunk("menu/delete", async (id, { rejectWithValue }) => {
//   try {
//     await menuService.delete(id);
//     return id;
//   } catch (err) {
//     return rejectWithValue(err.response?.data?.message || "Failed to delete menu item");
//   }
// });

// const menuSlice = createSlice({
//   name: "menu",
//   initialState: {
//     list: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     // ✅ Reset on logout (so menu of old restaurant doesn’t leak)
//     resetMenu: (state) => {
//       state.list = [];
//       state.loading = false;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Fetch menu items
//       .addCase(fetchMenuItems.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchMenuItems.fulfilled, (state, action) => {
//         state.loading = false;

//         // Normalize response
//         if (Array.isArray(action.payload)) {
//           state.list = action.payload;
//         } else if (action.payload?.items && Array.isArray(action.payload.items)) {
//           state.list = action.payload.items;
//         } else {
//           state.list = []; // ✅ fallback if API returns no data
//         }
//       })
//       .addCase(fetchMenuItems.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         state.list = [];
//       })

//       // Add menu item
//       .addCase(addMenuItem.fulfilled, (state, action) => {
//         state.list.push(action.payload);
//       })

//       // Update menu item
//       .addCase(updateMenuItem.fulfilled, (state, action) => {
//         const index = state.list.findIndex((m) => m.menuItemID === action.payload.menuItemID);
//         if (index !== -1) state.list[index] = action.payload;
//       })

//       // Delete menu item
//       .addCase(deleteMenuItem.fulfilled, (state, action) => {
//         state.list = state.list.filter((m) => m.menuItemID !== action.payload);
//       });
//   },
// });

// export const { resetMenu } = menuSlice.actions;
// export default menuSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { menuService } from "../Services/menu.service";

// ✅ Fetch all menu items
export const fetchMenuItems = createAsyncThunk(
  "menu/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await menuService.getAll();
      console.log("📦 Menu API response:", res);
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch menu items");
    }
  }
);

// ✅ Fetch single menu item (for dropdown/edit modal)
export const fetchMenuItemById = createAsyncThunk(
  "menu/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      return await menuService.getById(id);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch menu item");
    }
  }
);

export const addMenuItem = createAsyncThunk("menu/add", async (dto, { rejectWithValue }) => {
  try {
    return await menuService.add(dto);
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Failed to add menu item");
  }
});

export const updateMenuItem = createAsyncThunk(
  "menu/update",
  async ({ id, dto }, { rejectWithValue }) => {
    try {
      return await menuService.update(id, dto);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update menu item");
    }
  }
);

export const deleteMenuItem = createAsyncThunk("menu/delete", async (id, { rejectWithValue }) => {
  try {
    await menuService.delete(id);
    return id;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Failed to delete menu item");
  }
});

const menuSlice = createSlice({
  name: "menu",
  initialState: {
    list: [],
    selected: null,   // ✅ restore selected for dropdown
    loading: false,
    error: null,
  },
  reducers: {
    resetMenu: (state) => {
      state.list = [];
      state.selected = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch menu list
      .addCase(fetchMenuItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMenuItems.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(action.payload)) {
          state.list = action.payload;
        } else if (action.payload?.items) {
          state.list = action.payload.items;
        } else {
          state.list = [];
        }
      })
      .addCase(fetchMenuItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.list = [];
      })

      // Fetch single menu item
      .addCase(fetchMenuItemById.fulfilled, (state, action) => {
        state.selected = action.payload; // ✅ now dropdown can use this
      })

      // Add menu item
      .addCase(addMenuItem.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })

      // Update menu item
      .addCase(updateMenuItem.fulfilled, (state, action) => {
        const index = state.list.findIndex((m) => m.menuItemID === action.payload.menuItemID);
        if (index !== -1) state.list[index] = action.payload;
      })

      // Delete menu item
      .addCase(deleteMenuItem.fulfilled, (state, action) => {
        state.list = state.list.filter((m) => m.menuItemID !== action.payload);
      });
  },
});

export const { resetMenu } = menuSlice.actions;
export default menuSlice.reducer;
