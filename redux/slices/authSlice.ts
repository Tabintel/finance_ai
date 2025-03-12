"use client"
import { createSlice } from "@reduxjs/toolkit";
// const customerData = null;

const getUserData = () => {
  if (typeof window !== "undefined") {
    const storedUser = localStorage.getItem("customer");
    if (storedUser && storedUser !== "undefined") {
      try {
        return JSON.parse(storedUser);
      } catch (error) {
        console.error("Failed to parse user data:", error);
        localStorage.removeItem("customer"); // Clear invalid data
      }
    }
  }
  return null;
};

const initialState = {
  currentUser: getUserData() || {name:"Victor Essien"},
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    LogOut: (state, _action) => {
      state.currentUser = null;
      localStorage.removeItem("customer");
    },
    setUserCredentials: (state, action) => {
      state.currentUser = action.payload.user;
      // console.log(action.payload)
      localStorage.setItem("customer", JSON.stringify(action.payload.user));
    },
  },
});

export const { LogOut, setUserCredentials } = authSlice.actions;

export default authSlice.reducer;
