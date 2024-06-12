"use client";
import { payWithStripe } from "@/lib/actions/tours";
import { Button } from "../ui/button";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";
import Spinner from "./Spinner";
import { toast } from "react-toastify";

function BookForm({ tourId, image, name, price, size, isUser, hasExpired }) {
  const { push } = useRouter();
  const [state, formAction] = useFormState(payWithStripe, null);

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }
    if (state?.url) {
      push(state.url);
    }
  }, [state]);

  const Submit = ({ size }) => {
    const { pending } = useFormStatus();
    return (
      <Button className="w-full" disabled={!size || hasExpired}>
        {pending ? (
          <Spinner height={30} />
        ) : size == 0 ? (
          "Out of stock"
        ) : hasExpired ? (
          "Tour Date Passed"
        ) : (
          "Reserve"
        )}
      </Button>
    );
  };
  return (
    <form action={formAction} className="w-full flex flex-col gap-3">
      <input type="hidden" name="name" value={name} />
      <input type="hidden" name="image" value={image} />
      <input type="hidden" name="price" value={price} />
      <input type="hidden" name="tourId" value={tourId} />
      <input type="hidden" name="maxGroupSize" value={size} />

      <Select name="quantity" required>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Quantity" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup className="text-black">
            {Array.from({ length: size }).map((_, idx) => (
              <SelectItem value={String(idx + 1)} key={idx}>
                {idx + 1}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {isUser == "user" ? <Submit size={size} /> : "Only user can book."}
    </form>
  );
}

export default BookForm;
