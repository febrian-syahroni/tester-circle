import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';
import api from "../../utils/axios"; // Assuming the Axios instance is exported as api

// Define the login thunk
export const login = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      const { token } = response.data;
      Cookies.set("token", token); // Save the token in localStorage
      return token; // Return token to Redux state
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to login" // Improved error handling
      );
    }
  }
);

// Define the register thunk
export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post("/register", { email, password });
      const { token } = response.data;
      Cookies.set("token", token); // Save the token in localStorage
      return token; // Return token to Redux state
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to register" // Improved error handling
      );
    }
  }
);

// Define the AuthState interface
interface AuthState {
  token: string | null;
  loading: boolean;
  error: string | null;
}

// Define the initial state for the auth slice
const initialState: AuthState = {
  token: null, // Pastikan token diinisialisasi dengan null
  loading: false,
  error: null,
};

// Create the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null; // Clear token from state
      Cookies.remove("token"); // Remove token from localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true; // Set loading to true when login is in progress
        state.error = null; // Clear any previous errors
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false; // Set loading to false on successful login
        state.token = action.payload; // Store the token in state
      })
      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false; // Set loading to false on login failure
        state.error = action.payload; // Set error message
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true; // Set loading to true when registration is in progress
        state.error = null; // Clear any previous errors
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false; // Set loading to false on successful registration
        state.token = action.payload; // Store the token in state
      })
      .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false; // Set loading to false on registration failure
        state.error = action.payload; // Set error message
      });
  },
});

// Export the logout action and the reducer
export const { logout } = authSlice.actions;
export default authSlice.reducer;
