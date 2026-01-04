import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/socials`;

const sortSocials = (items) => {
  return [...items].sort((a, b) => {
    if (a.order !== b.order) return (a.order || 0) - (b.order || 0);
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
};

export const fetchSocials = createAsyncThunk("socials/fetchAll", async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const addSocial = createAsyncThunk("socials/add", async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
});

export const updateSocial = createAsyncThunk("socials/update", async (data) => {
  const response = await axios.put(`${API_URL}/${data._id}`, data);
  return response.data;
});

export const deleteSocial = createAsyncThunk("socials/delete", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const socialsSlice = createSlice({
  name: "socials",
  initialState: { items: [], status: "idle" },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSocials.fulfilled, (state, action) => {
        state.items = sortSocials(action.payload);
        state.status = "succeeded";
      })
      .addCase(addSocial.fulfilled, (state, action) => {
        state.items = sortSocials([...state.items, action.payload]);
      })
      .addCase(updateSocial.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (s) => s._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
          state.items = sortSocials(state.items);
        }
      })
      .addCase(deleteSocial.fulfilled, (state, action) => {
        state.items = state.items.filter((s) => s._id !== action.payload);
      });
  },
});

export default socialsSlice.reducer;
