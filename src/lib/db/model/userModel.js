import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      default: "https://staging.svgrepo.com/show/213788/avatar-user.svg",
    },
    role: {
      type: String,
      enum: ["user", "guide", "lead-guide", "admin", "superAdmin"],
      default: "user",
    },
    email: {
      type: String,
      required: true,
      default: "NE",
    },
    password: {
      type: String,
      required: [true, "Please Provide Password"],
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    passwordChangedAt: { type: Date },
    isActive: {
      type: Boolean,
      default: true,
    },
    
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
  },
  { timestamps: true }
);

export default mongoose.models?.User || mongoose.model("User", userSchema);
