import { configureStore } from "@reduxjs/toolkit";
import awardsReducer from "./awards/awardsSlice";
import membersReducer from "./members/membersSlice";
import videoGalleryReducer from "./videoGallery/videoGallerySlice";
import bannersReducer from "./banners/bannersSlice";
import copyrightReducer from "./copyright/copyrightSlice";
import socialsReducer from "./socials/socialsSlice";

export const store = configureStore({
  reducer: {
    awards: awardsReducer,
    members: membersReducer,
    galleryVideos: videoGalleryReducer,
    banners: bannersReducer,
    copyright: copyrightReducer,
    socials: socialsReducer,
  },
});
