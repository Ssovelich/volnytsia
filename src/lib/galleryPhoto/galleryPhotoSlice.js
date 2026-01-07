import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/gallery-photos`;

export const fetchAlbums = createAsyncThunk(
  "galleryPhotos/fetchAlbums",
  async () => {
    const response = await axios.get(API_URL);
    return response.data;
  }
);

export const addAlbum = createAsyncThunk(
  "galleryPhotos/addAlbum",
  async (formData) => {
    const response = await axios.post(API_URL, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  }
);

export const updateAlbum = createAsyncThunk(
  "galleryPhotos/updateAlbum",
  async ({ id, formData }) => {
    const response = await axios.patch(`${API_URL}/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  }
);

export const deleteAlbum = createAsyncThunk(
  "galleryPhotos/deleteAlbum",
  async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);

const galleryPhotoSlice = createSlice({
  name: "galleryPhotos",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbums.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAlbums.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchAlbums.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addAlbum.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
        state.items.sort((a, b) => a.order - b.order);
      })
      .addCase(updateAlbum.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        state.items.sort((a, b) => a.order - b.order);
      })
      .addCase(deleteAlbum.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
      });
  },
});

export default galleryPhotoSlice.reducer;
