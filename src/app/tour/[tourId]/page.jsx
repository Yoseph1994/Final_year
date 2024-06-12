import dynamic from "next/dynamic";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import BookForm from "@/components/uiComponents/BookForm";
const DetailPageMap = dynamic(
  () => import("@/components/uiComponents/DetailPageMap"),
  { ssr: false }
);
import ErrorAlert from "@/components/uiComponents/ErrorAlert";
import Rating from "@/components/uiComponents/Rating";
import TourCard from "@/components/uiComponents/TourCard";
import { fetchRelatedTours, fetchTourById } from "@/lib/actions/tours";
import Image from "next/image";
import { fetchReviewById } from "@/lib/actions/review";
import { format } from "date-fns";
import { findUserById } from "@/lib/actions/users";
import ReviewComponent from "@/components/uiComponents/ReviewComponent";

async function page({ params }) {
  const { tourId: id } = params;
  const res = await fetchTourById(id);
  const data = res ? JSON.parse(res) : null;
  const reviewRes = await fetchReviewById(id);
  const reviews = reviewRes ? JSON.parse(reviewRes) : null;
  const relatedRes = await fetchRelatedTours(data.difficulty);
  const relatedTours = relatedRes ? JSON.parse(relatedRes) : [];
  const rating =
    reviews.length > 0
      ? reviews.reduce((acc, cur) => acc + cur.rating, 0) / reviews.length
      : 0;
  const meRes = await findUserById();
  const me = meRes && JSON.parse(meRes);

  const tourStartDate = new Date(data.startDate || data.startDates[0]);
  const now = new Date();

  const hasExpired = tourStartDate < now;
  return (
    <div className="min-h-screen p-3">
      {!data ? (
        <div>
          <ErrorAlert
            description={
              "Something went wrong please check your connection and try again."
            }
          />
        </div>
      ) : (
        <div className="w-full max-w-[1300px] px-3 h-full mx-auto">
          <div className="grid grid-cols-8 gap-5 mb-4">
            <div className="col-span-8 sm:col-span-3 flex flex-col gap-4">
              <Image
                width={500}
                height={500}
                alt={data.name}
                src={data.imageCover}
                className="w-full"
              />
              <hr />
              <div className="flex gap-2 overflow-x-auto no-scrollbar">
                {data.images.map((image, idx) => (
                  <Image
                    width={500}
                    height={500}
                    alt={data.name}
                    src={image}
                    key={idx}
                    className="max-w-[130px] rounded-md"
                  />
                ))}
              </div>
            </div>

            <div className="sm:col-span-5 md:col-span-3 col-span-8 shadow-md px-2 pb-3 flex flex-col gap-2 bg-slate-50">
              <div className="flex max-sm:flex-col gap-3 sm:justify-between sm:items-center">
                <div className="flex flex-col gap-2">
                  <h1 className="text-2xl font-bold">{data.name}</h1>
                  <Rating value={rating} text={rating} />
                </div>
                <span>
                  <Badge
                    variant={
                      data.difficulty == "easy"
                        ? ""
                        : data.difficulty == "medium"
                        ? "secondary"
                        : data.difficulty == "hard"
                        ? "destructive"
                        : ""
                    }
                    className={
                      "w-16 flex items-center justify-center font-bold tracking-wide ring-1"
                    }
                  >
                    {data.difficulty}
                  </Badge>
                </span>
              </div>
              <b>Location:</b>
              <span className="w-full flex flex-col gap-2 bg-white shadow-sm border px-2 rounded-md text-sm mb-2 py-2">
                <span className="flex gap-2 ">
                  <b>From:</b>{" "}
                  <b className="whitespace-pre-line">
                    {data.startLocation.description}
                  </b>
                </span>
                <Separator />
                <span>
                  <b>To:</b>{" "}
                  <b className="text-slate-500">
                    {data.location.address || data.location[0].address}
                  </b>
                </span>
              </span>
              <span className="w-full flex gap-5 bg-white shadow-sm border px-2 rounded-md text-sm my-2 py-2">
                <span className="flex flex-col">
                  <b>Duration:</b> <b>{data.duration}</b>
                </span>
                <Separator orientation="vertical" />
                <span className="flex flex-col">
                  <b>Max Group:</b> <b>{data.maxGroupSize}</b>
                </span>
              </span>
              <span className="flex text-sm">
                the tour starts on &nbsp;
                <b>
                  {format(
                    new Date(data.startDate || data.startDates[0]),
                    "MM/dd/yyyy"
                  )}
                </b>
              </span>
              <div className="flex items-end gap-1">
                <h1 className="text-xl font-bold tracking-tighter">
                  ${data.price}
                </h1>
                {data.priceDiscount > 0 && (
                  <h1 className="font-bold text-slate-500">
                    $<s>{data.price + data.priceDiscount}</s>
                  </h1>
                )}
              </div>
              <div className="flex item-center gap-2 outline-none">
                <b>Amount: </b>
                <BookForm
                  tourId={data._id}
                  image={data.imageCover}
                  price={data.price}
                  name={data.name}
                  size={data.maxGroupSize}
                  isUser={me?.role}
                  hasExpired={hasExpired}
                />
              </div>
              <hr />
              <hr />

              <div className="flex flex-col gap-2 relative">
                <b>Summary:</b>
                <span className="max-h-[300px] overflow-y-auto w-full bg-white no-scrollbar p-1 whitespace-pre-line pb-5">
                  {data.summary}
                </span>
                <div className="w-full h-6 bg-gradient-to-t from-white to-white/30 absolute bottom-0"></div>
              </div>
            </div>

            <div className="sm:col-span-5 md:col-span-2 col-span-8 h-fit">
              {/* guider  */}
              <div className="flex flex-col gap-3 border p-2">
                {" "}
                <b>Guides: </b>
                {data.guides.map((item, idx) => (
                  <div className="bg-slate-50 shadow-md w-full px-1" key={idx}>
                    <span className="flex items-center justify-start px-2">
                      <Avatar className="size-14 overflow-hidden">
                        <AvatarImage
                          src={item.photo || "https://github.com/shadcn.png"}
                          className="size-14 rounded-full"
                        />
                        <AvatarFallback>B</AvatarFallback>
                      </Avatar>

                      <span className="p-2 flex flex-col gap-1">
                        <span>
                          <b>{item.name}</b>
                          <small
                            className={`${
                              item.isActive ? "text-green-400" : "text-red-500"
                            }`}
                          >
                            {" "}
                            |{item.isActive ? "active" : "inactive"}
                          </small>
                        </span>
                        <Badge
                          variant={"secondary"}
                          className={
                            "w-fit p-0 px-3 flex items-center justify-center font-bold tracking-wide ring-1"
                          }
                        >
                          {item.role}
                        </Badge>
                        <p className="text-sm">{item.email}</p>
                      </span>
                    </span>
                  </div>
                ))}
              </div>

              {data?.leadGuides?.length > 0 && (
                <div className="flex flex-col gap-3 border p-2">
                  {" "}
                  <b>Lead Guides: </b>
                  {data.leadGuides.map((item, idx) => (
                    <div
                      className="bg-slate-50 shadow-md w-full px-1"
                      key={idx}
                    >
                      <span className="flex items-center justify-start px-2">
                        <Avatar>
                          <AvatarImage
                            src={item?.photo || "https://github.com/shadcn.png"}
                          />
                          <AvatarFallback>B</AvatarFallback>
                        </Avatar>
                        <span className="p-2">
                          <b>{item.name}</b>
                          <p className="text-sm">{item.email}</p>
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-col gap-2 relative my-3 bg-slate-50 p-1 rounded-md">
                <b>Description:</b>
                <span className="max-h-[300px] overflow-y-auto w-full no-scrollbar p-1 whitespace-pre-line pb-5">
                  {data.description}
                </span>
                <div className="w-full h-6 bg-gradient-to-t from-white to-white/30 absolute bottom-0"></div>
              </div>
            </div>
          </div>
          <Separator />
          <div className="w-full my-10 flex flex-col gap-3">
            <div className="max-w-[800px] flex flex-col gap-5 mb-5">
              <h1 className="font-bold text-lg">Reviews</h1>
              {reviews.length > 0 ? (
                <ReviewComponent reviews={reviews} />
              ) : (
                <ErrorAlert
                  description={"No reviews yet."}
                  info={true}
                  safe={true}
                />
              )}
            </div>
            <div className="w-full">
              {" "}
              <DetailPageMap
                position={
                  data?.startLocation?.coordinates ||
                  data?.startLocation[0]?.coordinates
                }
              />
            </div>
            <hr />
            <h1 className="font-bold text-lg">Related Tours</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {relatedTours.length > 0 ? (
                relatedTours.map((data, idx) => (
                  <TourCard data={data} key={idx} />
                ))
              ) : (
                <div className="col-span-2 md:col-span-4">
                  <ErrorAlert
                    info={true}
                    description={"No related tours has been found."}
                    safe={true}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default page;
