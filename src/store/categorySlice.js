import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { categoryService } from "../Services/category.service";
export const fetchCategories = createAsyncThunk("categories/fetchAll", async () => {
    const res = await categoryService.getAll();
    console.log("📦 Categories API response:", res);
    return res;
  });
export const addCategory = createAsyncThunk("categories/add", async (dto) => {
  return await categoryService.add(dto);
});

export const updateCategory = createAsyncThunk("categories/update", async ({ id, dto }) => {
  return await categoryService.update(id, dto);
});

export const deleteCategory = createAsyncThunk("categories/delete", async (id) => {
  await categoryService.delete(id);
  return id;
});
const categorySlice = createSlice({
  name: "categories",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
  .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
      
    
        if (Array.isArray(action.payload)) {
          state.list = action.payload;
      
        } else if (action.payload.items) {
          state.list = action.payload.items;
   
        } else {
          state.list = [];
        }
      })
      


      .addCase(addCategory.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })

   
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.list.findIndex(c => c.categoryID === action.payload.categoryID);
        if (index !== -1) state.list[index] = action.payload;
      })

      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.list = state.list.filter(c => c.categoryID !== action.payload);
      });
  },
});

export default categorySlice.reducer;
