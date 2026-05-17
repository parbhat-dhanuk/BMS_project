import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";
import STATUS from "../status/status";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/auth/register", userData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  },
);

const initialState = {
  data: null,
  loading: false,
  status: null,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.status = STATUS.LOADING;
        state.error = null;
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.status = STATUS.SUCCESS;
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.status = STATUS.ERROR;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
