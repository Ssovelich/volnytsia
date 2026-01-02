import { configureStore } from "@reduxjs/toolkit";
import awardsReducer from "./awards/awardsSlice";
import membersReducer from "./members/membersSlice";
import videoGalleryReducer from "./videoGallery/videoGallerySlice";
import bannersReducer from "./banners/bannersSlice";

export const store = configureStore({
  reducer: {
    awards: awardsReducer,
    members: membersReducer,
    galleryVideos: videoGalleryReducer,
    banners: bannersReducer,
  },
});
