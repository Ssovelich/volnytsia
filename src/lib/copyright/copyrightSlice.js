import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/copyright`;

export const fetchCopyright = createAsyncThunk(
  "copyright/fetch",
  async (key) => {
    const response = await axios.get(`${API_URL}/${key}`);
    return response.data;
  }
);

export const updateCopyright = createAsyncThunk(
  "copyright/update",
  async ({ key, value }) => {
    const response = await axios.post(API_URL, { key, value });
    return response.data;
  }
);

const copyrightSlice = createSlice({
  name: "copyright",
  initialState: {
    data: null,
    status: "idle",
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCopyright.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "succeeded";
      })
      .addCase(updateCopyright.fulfilled, (state, action) => {
        state.data = action.payload;
      });
  },
});

export default copyrightSlice.reducer;