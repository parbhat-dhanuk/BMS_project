import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/auth/register", userData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

const initialState = {
  data: null,
  loading: false,
  status: null,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.status = "success";
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.status = "error";
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
