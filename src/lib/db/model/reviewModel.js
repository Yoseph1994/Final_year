import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema(
  {
    tour: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tour",
      required: [true, "Review must belong to a tour"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Review must belong to an user"],
    },
    review: {
      type: String,
      required: [true, "Review can't be empty"],
    },
    rating: {
      type: Number,
      min: [1, "Rating must have minimum value 1.0"],
      max: [5, "Rating must have maximum value 5.0"],
    },
  },
  { timestamps: true }
);

export default mongoose.models?.Review ||
  mongoose.model("Review", reviewSchema);
