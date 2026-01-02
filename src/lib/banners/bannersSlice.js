import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/banners`;

export const fetchBanners = createAsyncThunk(
  "banners/fetchBanners",
  async () => {
    const response = await axios.get(API_URL);
    return response.data;
  }
);

export const addBanner = createAsyncThunk(
  "banners/addBanner",
  async (formData) => {
    const response = await axios.post(API_URL, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  }
);

export const updateBanner = createAsyncThunk(
  "banners/updateBanner",
  async ({ id, formData }) => {
    const response = await axios.put(`${API_URL}/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  }
);

export const deleteBanner = createAsyncThunk(
  "banners/deleteBanner",
  async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);

const sortBanners = (items) => {
  return items.sort((a, b) => {
    if (a.order !== b.order) {
      return (a.order || 0) - (b.order || 0);
    }
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
};

const bannersSlice = createSlice({
  name: "banners",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanners.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = sortBanners(action.payload);
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addBanner.fulfilled, (state, action) => {
        state.items.push(action.payload);
        sortBanners(state.items);
      })
      .addCase(updateBanner.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (b) => b._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        sortBanners(state.items);
      })
      .addCase(deleteBanner.fulfilled, (state, action) => {
        state.items = state.items.filter((b) => b._id !== action.payload);
      });
  },
});

export default bannersSlice.reducer;
