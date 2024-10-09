import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import api from "../../utils/axios";

export const register = createAsyncThunk(
  "auth/register",
  async (
    {
      username,
      fullname,
      email,
      password,
    }: {
      username: string;
      fullname: string;
      email: string;
      password: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post("/auth/register", {
        username,
        fullname,
        email,
        password,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "User already exists"
      );
    }
  }
);

interface LoginType {
  username?: string;
  email?: string;
  password: string;
}

export const login = createAsyncThunk(
  "auth/login",
  async (
    { username, password }: LoginType,
    { rejectWithValue }
  ) => {
    try {
      const loginData = { username, password }
      const response = await api.post("/auth/login", loginData);
      const token = response.data.token;
      Cookies.set("token", token);
      console.log(response);
      return token;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "User tidak ditemukan atau password salah"
      );
    }
  }
);

export const getUserProfile = createAsyncThunk(
  "auth/getUserProfile",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState() as { auth: AuthState };
      if (!auth.token) {
        throw new Error("No token found");
      }
      const response = await api.get("/auth/check-auth");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user profile"
      );
    }
  }
);

interface AuthState {
  token: string | null;
  user: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: Cookies.get("token") || null,
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      Cookies.remove("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(register.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.token = action.payload;
      })
      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;