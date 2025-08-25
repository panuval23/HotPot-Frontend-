import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
  role: localStorage.getItem("role")?.toLowerCase() || null, 
  username: localStorage.getItem("username") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      const { token, role, username } = action.payload;
      state.token = token;
      state.role = role?.toLowerCase(); 
      state.username = username;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role?.toLowerCase()); 
      localStorage.setItem("username", username);
    },
    clearAuth: (state) => {
      state.token = null;
      state.role = null;
      state.username = null;

      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("username");
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;

