import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import postsReducer from "../features/post/postSlice";
import authReducer from "../features/user/userSlice"; // Pastikan untuk mengimpor authReducer

const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer,
    auth: authReducer, // Tambahkan auth ke dalam reducer di sini
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
