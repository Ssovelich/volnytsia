import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/awardsр`;

export const fetchAwards = createAsyncThunk("awards/fetchAll", async () => {
  const response = await axios.get(API_URL, {
    headers: {
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
  return response.data;
});

export const deleteAward = createAsyncThunk("awards/delete", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const awardsSlice = createSlice({
  name: "awards",
  initialState: { items: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAwards.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAwards.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchAwards.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteAward.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
      });
  },
});

export default awardsSlice.reducer;
