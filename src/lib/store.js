import { configureStore } from "@reduxjs/toolkit";
import awardsReducer from "./awards/awardsSlice";
import membersReducer from "./members/membersSlice";
import leadersReducer from "./leaders/leadersSlice";
import videoGalleryReducer from "./videoGallery/videoGallerySlice";
import bannersReducer from "./banners/bannersSlice";
import copyrightReducer from "./copyright/copyrightSlice";
import socialsReducer from "./socials/socialsSlice";
import galleryPhotosReducer from "./galleryPhoto/galleryPhotoSlice";

export const store = configureStore({
  reducer: {
    awards: awardsReducer,
    members: membersReducer,
    leaders: leadersReducer,
    galleryVideos: videoGalleryReducer,
    banners: bannersReducer,
    copyright: copyrightReducer,
    socials: socialsReducer,
    galleryPhotos: galleryPhotosReducer,
  },
});
