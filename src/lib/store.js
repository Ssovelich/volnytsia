import { configureStore } from '@reduxjs/toolkit';
import awardsReducer from './awards/awardsSlice';

export const store = configureStore({
  reducer: {
    awards: awardsReducer,
    // тут потім додасте gallery: galleryReducer і т.д.
  },
});