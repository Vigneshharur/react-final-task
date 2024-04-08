import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    changed: false,
  },
  reducers: {
    addUser(state, action) {
      state.users.push(action.payload);
      state.changed = true;
    },
    replaceUsers(state, action) {
      state.users = action.payload;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;

// isAdmin: false,
//     email: "",
//     password: "",
//     firstName: "",
//     lastName: "",
