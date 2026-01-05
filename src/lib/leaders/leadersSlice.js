import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/leaders`;

export const fetchLeaders = createAsyncThunk(
  "leaders/fetchLeaders",
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

export const addLeader = createAsyncThunk(
  "leaders/addLeader",
  async (formData) => {
    const response = await axios.post(API_URL, formData);
    return response.data;
  }
);

export const updateLeader = createAsyncThunk(
  "leaders/updateLeader",
  async ({ id, formData }) => {
    const response = await axios.put(`${API_URL}/${id}`, formData);
    return response.data;
  }
);

export const deleteLeader = createAsyncThunk(
  "leaders/deleteLeader",
  async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);

const sortLeaders = (items) => {
  return items.sort((a, b) => {
    if (a.order !== b.order) {
      return (a.order || 0) - (b.order || 0);
    }
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
};

const leadersSlice = createSlice({
  name: "leaders",
  initialState: { items: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaders.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchLeaders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = sortLeaders(action.payload);
      })
      .addCase(fetchLeaders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addLeader.fulfilled, (state, action) => {
        state.items.push(action.payload);
        sortLeaders(state.items);
      })
      .addCase(updateLeader.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (leader) => leader._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
          sortLeaders(state.items);
        }
      })
      .addCase(deleteLeader.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
      });
  },
});

export default leadersSlice.reducer;
