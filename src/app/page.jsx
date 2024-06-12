import ErrorAlert from "@/components/uiComponents/ErrorAlert";
import HomeCarousel from "@/components/uiComponents/HomeCarousel";
import Pagination from "@/components/uiComponents/HomePagePagination";
import FilterPriceComp from "@/components/uiComponents/FilterPriceComp";
import Spinner from "@/components/uiComponents/Spinner";
import Top5Cheap from "@/components/uiComponents/Top5Cheap";
import TourCard from "@/components/uiComponents/TourCard";
import { fetchAllTours, fetchTop5Cheap } from "@/lib/actions/tours";
import { Suspense } from "react";
async function page({ searchParams }) {
  const page = searchParams.page || 1;
  const price = searchParams.price;
  const { tours, totalPage } = await fetchAllTours(page, price);
  const cheapToursRes = await fetchTop5Cheap();
  const top5Cheap = cheapToursRes ? JSON.parse(cheapToursRes) : null;

  return (
    <div className="p-5 ">
      <HomeCarousel />
      {tours && top5Cheap ? (
        <div className="mt-20 max-w-7xl mx-auto flex flex-col gap-3">
          <Top5Cheap top5Cheap={top5Cheap} />

          <>
            <span className="flex justify-between items-center">
              <b className="text-xl">Popular Places</b>
              <Suspense fallback={<Spinner height={15} />}>
                <FilterPriceComp />
              </Suspense>
            </span>

            <Suspense fallback={<Spinner />}>
              <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {tours.map((tour, idx) => (
                  <TourCard key={idx} data={tour} />
                ))}
              </div>
            </Suspense>
            {totalPage > 1 && <Pagination totalPage={totalPage} />}
          </>
        </div>
      ) : (
        <div className="mt-20">
          <ErrorAlert
            description={
              "Something went wrong please check your connection and try again."
            }
          />
        </div>
      )}
    </div>
  );
}

export default page;
