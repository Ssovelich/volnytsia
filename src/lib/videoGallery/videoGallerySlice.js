import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/gallery-videos`;

export const fetchVideos = createAsyncThunk(
  "galleryVideos/fetchVideos",
  async () => {
    const response = await axios.get(API_URL);
    return response.data;
  }
);

export const addVideo = createAsyncThunk(
  "galleryVideos/addVideo",
  async (formData) => {
    const response = await axios.post(API_URL, formData);
    return response.data;
  }
);

export const deleteVideo = createAsyncThunk(
  "galleryVideos/deleteVideo",
  async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);

const sortVideos = (items) => {
  return items.sort((a, b) => {
    if (a.order !== b.order) {
      return (a.order || 0) - (b.order || 0);
    }
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
};

const videoGallerySlice = createSlice({
  name: "galleryVideos",
  initialState: { items: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = sortVideos(action.payload);
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addVideo.fulfilled, (state, action) => {
        state.items.push(action.payload);
        sortVideos(state.items);
      })
      .addCase(deleteVideo.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
      });
  },
});

export default videoGallerySlice.reducer;
