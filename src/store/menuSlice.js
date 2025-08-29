import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { menuService } from "../Services/menu.service";


export const fetchMenuItems = createAsyncThunk("menu/fetchAll", async ({ page = 1, size = 10 }) => {
  return await menuService.getAll(page, size);
});

export const fetchMenuItemById = createAsyncThunk("menu/fetchById", async (id) => {
  return await menuService.getById(id);
});

export const addMenuItem = createAsyncThunk("menu/add", async (dto) => {
  return await menuService.add(dto);
});

export const updateMenuItem = createAsyncThunk("menu/update", async ({ id, dto }) => {
  return await menuService.update(id, dto);
});

export const deleteMenuItem = createAsyncThunk("menu/delete", async (id) => {
  await menuService.delete(id);
  return id;
});


const menuSlice = createSlice({
  name: "menu",
  initialState: {
    list: [],
    selected: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      
      .addCase(fetchMenuItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMenuItems.fulfilled, (state, action) => {
        state.loading = false;

        if (Array.isArray(action.payload)) {
          state.list = action.payload;
        } else if (action.payload.items) {
          state.list = action.payload.items;
        } else {
          state.list = [];
        }
      })
      .addCase(fetchMenuItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

   
      .addCase(fetchMenuItemById.fulfilled, (state, action) => {
        state.selected = action.payload;
      })

   
      .addCase(addMenuItem.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })


      .addCase(updateMenuItem.fulfilled, (state, action) => {
        const index = state.list.findIndex(m => m.menuItemID === action.payload.menuItemID);
        if (index !== -1) state.list[index] = action.payload;
      })

     
      .addCase(deleteMenuItem.fulfilled, (state, action) => {
        state.list = state.list.filter(m => m.menuItemID !== action.payload);
      });
  },
});

export default menuSlice.reducer;
