import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";
import STATUS from "../status/status";



export const addBlog = createAsyncThunk(
  "blog/addBlog",
  async (formData, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/blog", formData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  },
);

export const editBlog = createAsyncThunk(
  "blog/editBlog",
  async ({id,formData}, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(`/blog/${id}`, formData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  },
);

export const getSingleBlog = createAsyncThunk(
  "blog/getSingleBlog",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/blog/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  },
);

export const deleteBlog = createAsyncThunk(
  "blog/deleteBlog",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`/blog/${id}`);
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
  blog: null,
};
 const blogSlice = createSlice({
  name: "blog",
  initialState,
      extraReducers: (builder) => {
      builder
        // Add Blog
        .addCase(addBlog.pending, (state) => {
          state.loading = true;
          state.status = STATUS.LOADING;
          state.error = null;
        })

        .addCase(addBlog.fulfilled, (state, action) => {
          state.loading = false;
          state.status = STATUS.SUCCESS;
          state.blog=action.payload;
        })

        .addCase(addBlog.rejected, (state, action) => {
          state.loading = false;
          state.status = STATUS.ERROR;
          state.error = action.payload;
        })
        //EDIT BLOG
        .addCase(editBlog.pending,(state)=>{
            state.loading=true;
            state.status=STATUS.LOADING;
            state.error=null
        })
        .addCase(editBlog.fulfilled,(state,action)=>{
            state.loading=false;
            state.status=STATUS.SUCCESS;
            state.blog=action.payload;
        })
        .addCase(editBlog.rejected,(state,action)=>{
            state.loading=false;
            state.status=STATUS.ERROR;
            state.error=action.payload;
        })
        //GET SINGLE BLOG
        .addCase(getSingleBlog.pending,(state)=>{
            state.loading=true;
            state.status=STATUS.LOADING;
            state.error=null
        })
        .addCase(getSingleBlog.fulfilled,(state,action)=>{
            state.loading=false;
            state.status=STATUS.SUCCESS;
            state.blog=action.payload;
        })
        .addCase(getSingleBlog.rejected,(state,action)=>{
            state.loading=false;
            state.status=STATUS.ERROR;
            state.error=action.payload;
        })
        //DELETE BLOG
      .addCase(deleteBlog.pending,(state)=>{
            state.loading=true;
            state.status=STATUS.LOADING;
            state.error=null
      })
      .addCase(deleteBlog.fulfilled,(state,action)=>{
        state.loading=false;
        state.status=STATUS.SUCCESS;
      })
      .addCase(deleteBlog.rejected,(state,action)=>{
        state.loading=false;
        state.status=STATUS.ERROR;
        state.error=action.payload;
      })

    },
});

export default blogSlice.reducer;
