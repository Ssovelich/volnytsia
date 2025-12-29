import { configureStore } from "@reduxjs/toolkit";
import awardsReducer from "./awards/awardsSlice";
import membersReducer from "./members/membersSlice";
import videoGalleryReducer from "./videoGallery/videoGallerySlice";

export const store = configureStore({
  reducer: {
    awards: awardsReducer,
    members: membersReducer,
    galleryVideos: videoGalleryReducer,
  },
});
