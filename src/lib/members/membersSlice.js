import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/members`;

export const fetchMembers = createAsyncThunk(
  "members/fetchMembers",
  async () => {
    const response = await axios.get(API_URL, {
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
    return response.data;
  }
);

export const addMember = createAsyncThunk(
  "members/addMember",
  async (formData) => {
    const response = await axios.post(API_URL, formData);
    return response.data;
  }
);

export const updateMember = createAsyncThunk(
  "members/updateMember",
  async ({ id, formData }) => {
    const response = await axios.put(`${API_URL}/${id}`, formData);
    return response.data;
  }
);

export const deleteMember = createAsyncThunk(
  "members/deleteMember",
  async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);

const sortMembers = (items) => {
  return items.sort((a, b) => {
    if (a.order !== b.order) {
      return (a.order || 0) - (b.order || 0);
    }
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
};

const membersSlice = createSlice({
  name: "members",
  initialState: { items: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMembers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchMembers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = sortMembers(action.payload);
      })
      .addCase(fetchMembers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addMember.fulfilled, (state, action) => {
        state.items.push(action.payload);
        sortMembers(state.items);
      })
      .addCase(updateMember.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (m) => m._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
          sortMembers(state.items);
        }
      })
      .addCase(deleteMember.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
      });
  },
});

export default membersSlice.reducer;
