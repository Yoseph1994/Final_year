import { configureStore } from "@reduxjs/toolkit";
import imagesSlice from "./imagesSlice";

const store = configureStore({
  reducer: {
    images: imagesSlice,
  },
});

export default store;
