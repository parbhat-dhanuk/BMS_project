import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";
import STATUS from "../status/status";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/auth/registe", userData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/auth/login", userData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  },
);

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/auth/me");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  },
);

// /auth/logout
export const userLogout = createAsyncThunk(
  "auth/userLogout",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/auth/logout");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  },
);

const initialState = {
  loading: false,
  status: null,
  error: null,
  user: null,
  isAuthChecked: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.status = STATUS.LOADING;
        state.error = null;
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.status = STATUS.SUCCESS;
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.status = STATUS.ERROR;
        state.error = action.payload;
      })
      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.status = STATUS.LOADING;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.status = STATUS.SUCCESS;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.status = STATUS.ERROR;
        state.error = action.payload;
      })
      // CHECK AUTH
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
        state.status = STATUS.LOADING;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.status = STATUS.SUCCESS;
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.loading = false;
        state.status = STATUS.ERROR;
        state.isAuthChecked = true;
      })
      .addCase(userLogout.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLogout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthChecked = true;
        state.status=null;
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthChecked = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
