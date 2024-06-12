"use server";
import connectDB from "../db/config";
import reviewModel from "../db/model/reviewModel";
import { verifyToken } from "../VerifyToken";

export const giveReview = async (currentState, formData) => {
  const { userInfo } = await verifyToken();
  const { tourId, review, rating } = Object.fromEntries(formData);
  if (!review || !rating) {
    return { error: "All fields must be provided" };
  }

  const reviewInfo = {
    tour: tourId,
    user: userInfo?.userId,
    review,
    rating,
  };
  try {
    await connectDB();
    const reviewExist = await reviewModel.findOne({
      user: reviewInfo.user,
      tour: reviewInfo.tour,
    });
    if (reviewExist) {
      return { error: "Your already gave review." };
    } else {
      const reviewStatus = await reviewModel.create(reviewInfo);
      if (reviewStatus) {
        return { success: "Review Added successfully." };
      } else {
        return { error: "Something went wrong please try again" };
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchReviewById = async (id) => {
  try {
    await connectDB();
    const review = await reviewModel.find({ tour: id }).populate("user").lean();
    return JSON.stringify(review);
  } catch (error) {
    console.log(error);
  }
};

export const deleteReview = async (currentState, formData) => {
  const reviewId = formData.get("id");

  try {
    await connectDB();
    await reviewModel.findByIdAndDelete(reviewId);
    return { success: true };
  } catch (error) {
    console.log(error);
    return { error: "something went wrong please try again" };
  }
};
