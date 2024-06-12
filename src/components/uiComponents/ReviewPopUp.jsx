"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useEffect, useRef, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { useFormState, useFormStatus } from "react-dom";
import { giveReview } from "@/lib/actions/review";
import { toast } from "react-toastify";
import Spinner from "./Spinner";

export default function ReviewPopUp({ tourId }) {
  const [rating, setRating] = useState(1);
  const [state, formAction] = useFormState(giveReview, null);
  const formRef = useRef();
  const ratingChanged = (newRating) => {
    setRating(newRating);
  };

  useEffect(() => {
    if (state?.success) {
      toast.success(state?.success);
      formRef.current.reset();
    }
    if (state?.error) {
      toast.error(state?.error);
    }
  }, [state]);

  const Submit = () => {
    const { pending } = useFormStatus();
    return (
      <Button type="submit" disabled={pending}>
        {pending ? <Spinner height={30} /> : "Give Review"}
      </Button>
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Review</Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Review Tour</DialogTitle>
          <DialogDescription>Give review to the tour.</DialogDescription>
        </DialogHeader>
        <form action={formAction} className="grid gap-4 py-4" ref={formRef}>
          <input type="hidden" name="rating" value={rating} />
          <input type="hidden" name="tourId" value={tourId} />
          <div className="flex items-center gap-4 px-5">
            <Label htmlFor="name" className="text-right">
              Rating
            </Label>
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={35}
              activeColor="#ffd700"
            />
          </div>
          <div className="flex gap-4 px-5">
            <Label htmlFor="username" className="text-right">
              Review
            </Label>
            <textarea
              name="review"
              id="review"
              className="mt-2 w-full rounded-lg border border-gray-400 px-2 outline-none shadow-sm sm:text-sm"
              rows="4"
              placeholder="Enter any additional order notes..."
            ></textarea>
          </div>
          <DialogFooter>
            <Submit />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
