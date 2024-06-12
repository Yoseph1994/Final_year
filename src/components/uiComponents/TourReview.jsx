"use client"
import React, { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "../ui/separator";
import { Badge } from "@/components/ui/badge";
import Rating from "./Rating";
import { format } from "date-fns";

import { Trash2 } from "lucide-react";
import { useFormState, useFormStatus } from "react-dom";
import Spinner from "./Spinner";
import { deleteReview } from "@/lib/actions/review";
import { toast } from "react-toastify";

export const ReviewComp = ({ review, id }) => {
  const [state, formAction] = useFormState(deleteReview, null);
  useEffect(() => {
    if (state?.success) {
      window.location.reload();
    }
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state]);

  const Submit = () => {
    const { pending } = useFormStatus();
    return (
      <button type="submit" disabled={pending}>
        {pending ? <Spinner height={15} /> : <Trash2 />}
      </button>
    );
  };

  return (
    <div className="flex gap-4">
      <Avatar>
        <AvatarImage
          src={review?.user?.photo || "https://github.com/shadcn.png"}
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex-1 flex flex-col gap-1">
        <div className="flex justify-between">
          <span className="sml:flex gap-2">
            <b className="line-clamp-1">{review?.user?.name}</b>
            <Badge
              className={
                "w-16 h-fit flex items-center justify-center font-bold tracking-wide ring-1 text-white"
              }
            >
              {review?.user?.role}
            </Badge>
          </span>
          <small>
            <b>{format(new Date(review.createdAt), "MM/dd/yyyy")}</b>
          </small>
        </div>
        <Rating value={review?.rating} />
        <span className="flex flex-col sml:flex-row w-full gap-2 justify-between">
          <p className="text-sm mt-2">{review?.review}</p>
          {id == review.user._id && (
            <form action={formAction}>
              <input type="hidden" name="id" value={review._id} />
              <Submit />
            </form>
          )}
        </span>
        <Separator />
      </div>
    </div>
  );
};
function TourReview({ reviews }) {
  return (
    <div>
      {reviews.map((review, idx) => (
        <ReviewComp key={idx} review={review} />
      ))}
    </div>
  );
}

export default TourReview;
