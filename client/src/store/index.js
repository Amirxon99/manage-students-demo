import { createSlice, configureStore } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: { token: "", isAuth: false, user: null },
  reducers: {
    login(state, action) {
      //   console.log(action.payload);
      state.isAuth = true;
      state.token = action.payload.data.jwt;
      state.user = action.payload.data.user;
    },
  },
});

const store = configureStore({ reducer: { app: appSlice.reducer } });
export const appActions = appSlice.actions;
export default store;
