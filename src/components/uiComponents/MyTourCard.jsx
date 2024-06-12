import Image from "next/image";
import Link from "next/link";
import { formatDistance } from "date-fns";
import ReviewPopUp from "./ReviewPopUp";

function MyTourCard({ item }) {
  return (
    <div className="flex bg-white transition border hover:shadow-xl">
      <div className="rotate-180 p-2 [writing-mode:_vertical-lr]">
        <div className="flex items-center justify-between gap-4 text-xs font-bold uppercase text-gray-900">
          <span>{item.createdAt.split("-")[0]}</span>
          <span>
            {formatDistance(new Date(), item.createdAt, {
              addSuffix: true,
            })}
          </span>
        </div>
      </div>

      <div className="hidden sm:block sm:basis-56">
        <Image
          width={500}
          height={500}
          alt={item.tour.name}
          src={item.tour.imageCover}
          className="aspect-square h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
          <div>
            <h3 className="font-bold uppercase text-gray-900">
              {item.tour.name}
            </h3>
            <h5 className="font-semibold uppercase text-slate-700">
              ${item.price}
            </h5>
            <h5 className="font-semibold text-slate-700">Status: Booked</h5>
            <h5 className="font-semibold text-slate-700">
              Invoice: {item.pdfLink ? "YES" : "NO"}
            </h5>
            <h5 className="font-semibold text-slate-700">
              Payment: {item.status == "paid" ? "PAID" : "PENDING"}
            </h5>
          </div>

          <p className="mt-2 line-clamp-5 text-sm/relaxed text-gray-700">
            {item.description}
          </p>
        </div>
        <div className="flex gap-2 items-center w-full ">
          <div className="ml-auto">
            <ReviewPopUp tourId={item.tour._id} />
          </div>
          {item.pdfLink && (
            <Link
              href={item.pdfLink}
              target="_blank"
              className="w-fit block h-fit px-2 py-2 text-center text-xs font-bold uppercase text-gray-900 transition hover:text-primary"
            >
              find PDF
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyTourCard;
