import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    loggedInUserAccessKey: localStorage.getItem("loggedInUserAccessKey"),
    isLoggedIn: !!localStorage.getItem("loggedInUserAccessKey"),
  },
  reducers: {
    loginUser: (state, action) => {
      state.loggedInUserAccessKey = action.payload;
      state.isLoggedIn = true;
    },
    logoutUser: (state) => {
      state.loggedInUserAccessKey = null;
      state.isLoggedIn = false;
    },
  },
});
export const { loginUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;