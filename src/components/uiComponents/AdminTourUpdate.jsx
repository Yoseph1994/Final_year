"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "../ui/separator";
import AdminDatePicker from "./AdminDatePicker";
import ImagesUpload from "./ImagesUpload";
import PrimaryImageUpload from "./PrimaryImageUpload";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import { updateTour } from "@/lib/actions/tours";
import { useFormState, useFormStatus } from "react-dom";
import MultipleSelect from "./MultipleSelect";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Spinner from "./Spinner";
import { toast } from "react-toastify";
import Link from "next/link";
import MultipleLeadGuidesSelect from "./MultipleLeadGuidesSelect";

function AdminTourUpdate({ tour }) {
  const { push } = useRouter();
  const [state, formAction] = useFormState(updateTour, null);
  const { images, coverImage, startingDate, chosenGuides, chosenLeadGuides } =
    useSelector((state) => state.images);

  useEffect(() => {
    if (state?.success) {
      toast.success("Tour updated successfully");
      window.location.reload()
    } else if (state?.error) {
      toast.error(state?.error);
    }
  }, [state]);

  const Submit = () => {
    const { pending } = useFormStatus();
    return (
      <Button type="submit" disabled={pending} className="relative w-fit">
        {pending ? <Spinner height={30} /> : "Submit"}
      </Button>
    );
  };
  return (
    <form action={formAction} className="flex flex-col gap-5">
      <input type="hidden" name="coverImage" value={coverImage} />
      <input type="hidden" name="images" value={JSON.stringify(images)} />
      <input type="hidden" name="startingDate" value={startingDate} />
      <input type="hidden" name="guides" value={chosenGuides} />
      <input type="hidden" name="tourId" value={tour._id} />
      <input type="hidden" name="leadGuides" value={chosenLeadGuides} />
      <div className="grid sm:grid-cols-3 gap-3">
        <span className="flex flex-col gap-1">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-form_text"
          >
            Name
          </label>

          <input
            type="text"
            id="name"
            name="name"
            placeholder={tour.name}
            className="text-sm py-2 indent-2 outline-none border border-black/20 rounded-md"
          />
        </span>

        <span className="flex flex-col gap-1">
          <label
            htmlFor="duration"
            className="block text-sm font-medium text-form_text"
          >
            Duration
          </label>

          <input
            type="number"
            id="duration"
            name="duration"
            placeholder={tour.duration}
            className="text-sm py-2 indent-2 outline-none border border-black/20 rounded-md"
          />
        </span>

        <span className="flex flex-col gap-1">
          <label
            htmlFor="maxGroupSize"
            className="block text-sm font-medium text-form_text"
          >
            Max Groupe Size
          </label>

          <input
            type="number"
            id="maxGroupSize"
            name="maxGroupSize"
            placeholder={tour.maxGroupSize}
            className="text-sm py-2 indent-2 outline-none border border-black/20 rounded-md"
          />
        </span>
      </div>
      {/* //////////////////////////////////////// */}
      <div className="grid sm:grid-cols-3 gap-3">
        <span className="flex flex-col gap-1">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-form_text"
          >
            Difficulty
          </label>

          <Select name="difficulty">
            <SelectTrigger className="w-full">
              <SelectValue placeholder={tour.difficulty} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </span>

        <span className="flex flex-col gap-1">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-form_text"
          >
            Price
          </label>

          <input
            type="number"
            id="price"
            name="price"
            placeholder={tour.price}
            className="text-sm py-2 indent-2 outline-none border border-black/20 rounded-md"
          />
        </span>

        <span className="flex flex-col gap-1">
          <label
            htmlFor="priceDiscount"
            className="block text-sm font-medium text-form_text"
          >
            Price Discount
          </label>

          <input
            type="number"
            id="priceDiscount"
            name="discount"
            placeholder={tour.priceDiscount}
            className="text-sm py-2 indent-2 outline-none border border-black/20 rounded-md"
          />
        </span>
      </div>

      <Separator />
      <div className="grid sm:grid-cols-2 gap-3">
        <span className="flex flex-col gap-1">
          <label
            htmlFor="summary"
            className="block text-sm font-medium text-form_text"
          >
            Summary
          </label>

          <textarea
            id="summary"
            name="summary"
            className="text-sm py-2 indent-2 outline-none border border-black/20 rounded-md"
            rows="4"
            placeholder={tour.summary}
          ></textarea>
        </span>

        <span className="flex flex-col gap-1">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-form_text"
          >
            Description
          </label>

          <textarea
            id="description"
            name="description"
            className="text-sm py-2 indent-2 outline-none border border-black/20 rounded-md"
            rows="4"
            placeholder={tour.description}
          ></textarea>
        </span>
      </div>
      <Separator />

      <div className="grid gap-3">
        <span className="flex flex-col gap-1 border p-2">
          <label
            htmlFor="day"
            className="block text-sm font-medium text-form_text"
          >
            Staring Date
          </label>

          <AdminDatePicker />
        </span>
      </div>
      <Separator />

      <h1 className="text-lg font-semibold">
        Starting Location
        <small>
          <Link
            href={"https://positionstack.com/"}
            target="_blanc"
            className="text-xs text-primary"
          >
            Get long&lat
          </Link>
        </small>
      </h1>
      <div className="grid sm:grid-cols-3 gap-3">
        <div className="grid lg:flex gap-2 border border-slate-200 p-3">
          <div className="">
            <label htmlFor="startLong" className="text-xs">
              Longitude
            </label>

            <div className="flex items-center gap-1">
              <button
                type="button"
                className="size-10 leading-10 text-gray-600 transition hover:opacity-75"
              >
                -
              </button>

              <input
                type="text"
                id="startLong"
                name="startLong"
                className="h-10 w-16 rounded outline-none border border-gray-500 text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
              />

              <button
                type="button"
                className="size-10 leading-10 text-gray-600 transition hover:opacity-75"
              >
                +
              </button>
            </div>
          </div>
          <Separator orientation="vertical" />
          <div className="">
            <label htmlFor="startLat" className="text-xs">
              Latitude
            </label>

            <div className="flex items-center gap-1">
              <button
                type="button"
                className="size-10 leading-10 text-gray-600 transition hover:opacity-75"
              >
                -
              </button>

              <input
                type="text"
                id="startLat"
                name="startLat"
                className="h-10 w-16 rounded outline-none border border-gray-500 text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
              />

              <button
                type="button"
                className="size-10 leading-10 text-gray-600 transition hover:opacity-75"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <span className="flex flex-col gap-1">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-form_text"
          >
            Starting Address
          </label>

          <input
            type="text"
            id="startAddress"
            name={tour.startLocation.address || tour.startLocation[0].address}
            placeholder="Start Address"
            className="text-sm py-2 indent-2 outline-none border border-black/20 rounded-md"
          />
        </span>

        <span className="flex flex-col gap-1">
          <label
            htmlFor="startingDescription"
            className="block text-sm font-medium text-form_text"
          >
            Description
          </label>

          <textarea
            id="startingDescription"
            name="startDescription"
            className="text-sm py-2 indent-2 outline-none border border-black/20 rounded-md"
            rows="4"
            placeholder={
              tour.startLocation.description ||
              tour.startLocation[0].description
            }
          ></textarea>
        </span>
      </div>

      <Separator />
      <h1 className="text-lg font-semibold">
        Location{" "}
        <small>
          <Link
            href={"https://positionstack.com/"}
            target="_blanc"
            className="text-xs text-primary"
          >
            Get long&lat
          </Link>
        </small>
      </h1>
      <div className="grid md:grid-cols-3 gap-3">
        <div className="grid lg:flex gap-2 border border-slate-200 p-3">
          <div className="">
            <label htmlFor="landLong" className="text-xs">
              Longitude
            </label>

            <div className="flex items-center gap-1">
              <button
                type="button"
                className="size-10 leading-10 text-gray-600 transition hover:opacity-75"
              >
                -
              </button>

              <input
                type="text"
                id="landLong"
                name="landLong"
                className="h-10 w-16 rounded outline-none border border-gray-500 text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
              />

              <button
                type="button"
                className="size-10 leading-10 text-gray-600 transition hover:opacity-75"
              >
                +
              </button>
            </div>
          </div>
          <Separator orientation="vertical" />
          <div className="">
            <label htmlFor="landLat" className="text-xs">
              Latitude
            </label>

            <div className="flex items-center gap-1">
              <button
                type="button"
                className="size-10 leading-10 text-gray-600 transition hover:opacity-75"
              >
                -
              </button>

              <input
                type="text"
                id="landLat"
                name="landLat"
                className="h-10 w-16 rounded outline-none border border-gray-500 text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
              />

              <button
                type="button"
                className="size-10 leading-10 text-gray-600 transition hover:opacity-75"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <span className="flex flex-col gap-1">
          <label
            htmlFor="landingAddress"
            className="block text-sm font-medium text-form_text"
          >
            Landing Address
          </label>

          <input
            type="text"
            name="landingAddress"
            id="landingAddress"
            placeholder={tour.location.address || tour.location[0].address}
            className="text-sm py-2 indent-2 outline-none border border-black/20 rounded-md"
          />
        </span>

        <span className="flex flex-col gap-1">
          <label
            htmlFor="landingDescription"
            className="block text-sm font-medium text-form_text"
          >
            Description
          </label>

          <textarea
            id="landingDescription"
            name="landingDescription"
            className="text-sm py-2 indent-2 outline-none border border-black/20 rounded-md"
            rows="4"
            placeholder={
              tour.location.description || tour.location[0].description
            }
          ></textarea>
        </span>
      </div>

      <Separator />
      <h1 className="text-lg font-semibold">Choose Guides</h1>
      <div className="grid sm:grid-cols-2 gap-3">
        <span>
          <small>
            <b>Guides</b>
          </small>
          <MultipleSelect guides={tour?.guides} />
        </span>
        <span>
          <small>
            <b>Lead Guides</b>
          </small>
          <MultipleLeadGuidesSelect guides={tour?.leadGuides || []} />
        </span>
      </div>

      <Separator />
      <h1 className="font-semibold text-md">Upload Tour Images</h1>
      <div className="col-span-6 sm:col-span-5 bg-white p-5 grid sm:grid-cols-6 gap-3 rounded-lg font-medium">
        <div className="col-span-4 md:col-span-2 p-2 flex flex-col gap-3">
          <h1 className="text-sm font-semibold">Cover Image</h1>
          <span className="border p-3">
            <PrimaryImageUpload />
          </span>
        </div>
        <div className="col-span-4 p-2 flex flex-col gap-3">
          <h1 className="font-semibold text-sm">Detail Images</h1>
          <span className="border p-3">
            <ImagesUpload />
          </span>
        </div>
      </div>
      <Submit />
    </form>
  );
}

export default AdminTourUpdate;
