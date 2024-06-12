import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    tour: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tour",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    price: {
      type: Number,
      required: [true, "Booking must have a price"],
    },
    pdfLink: {
      type: String,
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "paid", "canceled"],
        message: "Booking status can be - pending, paid and canceled only",
      },
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.models?.Book || mongoose.model("Book", bookSchema);
