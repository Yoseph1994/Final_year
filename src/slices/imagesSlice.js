// store/imageSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  images: [],
  coverImage: null,
  startingDate: null,
  chosenGuides: null,
  chosenLeadGuides: null,
};

const imageSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    addImages: (state, action) => {
      state.images.push(action.payload);
    },
    addCoverImage: (state, action) => {
      state.coverImage = action.payload;
    },
    addStartingDate: (state, action) => {
      state.startingDate = action.payload;
    },
    addGuides: (state, action) => {
      state.chosenGuides = action.payload;
    },
    addLeadGuides: (state, action) => {
      state.chosenLeadGuides = action.payload;
    },
  },
});

export const {
  addImages,
  addCoverImage,
  addStartingDate,
  addGuides,
  addLeadGuides,
} = imageSlice.actions;
export default imageSlice.reducer;
