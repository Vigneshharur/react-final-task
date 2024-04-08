import { createSlice } from "@reduxjs/toolkit";

let credential = JSON.parse(localStorage.getItem("auth"));

if (!credential) {
  credential = {
    user: undefined,
    isAdmin: false,
  };
}

const authSlice = createSlice({
  name: "auth",
  initialState: {
    credential,
    changed: true,
  },
  reducers: {
    setUser(state, action) {
      state.credential = action.payload;
      state.changed = true;
    },
    replaceAuth(state, action) {
      state.credential = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
