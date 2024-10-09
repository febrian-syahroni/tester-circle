import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import threadsReducer from "../features/post/postSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    threads: threadsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
