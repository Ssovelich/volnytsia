import { configureStore } from '@reduxjs/toolkit';
import awardsReducer from './awards/awardsSlice';
import membersReducer from "@/lib/members/membersSlice"

export const store = configureStore({
  reducer: {
    awards: awardsReducer,
    members: membersReducer,
  },
});