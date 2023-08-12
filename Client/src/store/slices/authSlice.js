import { createSlice } from "@reduxjs/toolkit";

// Initial State
const initialState = {
  userData: JSON.parse(localStorage.getItem("userData") ?? "{}"),
};

// To store Auth Data in Local To Identify weather user is Logged in or not
const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setCredential: (state, action) => {
      state.userData = action.payload;
      localStorage.setItem("userData", JSON.stringify(action.payload));
    },

    removeCredential: (state) => {
      state.userData = null;
      localStorage.removeItem("userData");
    },
  },
});

//
const authReducer = authSlice.reducer;

export default authReducer;

export const { setCredential, removeCredential } = authSlice.actions;

export const getAuth = (state) => state.auth.userData;
