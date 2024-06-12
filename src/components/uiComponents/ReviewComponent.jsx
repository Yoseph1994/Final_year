import { ReviewComp } from "./TourReview";
import { findUserById } from "@/lib/actions/users";

async function ReviewComponent({ reviews }) {
  const meRes = await findUserById();
  const me = JSON.parse(meRes);
  return (
    <div className="flex flex-col gap-5">
      {reviews.map((review, idx) => (
        <ReviewComp key={idx} review={review} id={me?._id} />
      ))}
    </div>
  );
}

export default ReviewComponent;