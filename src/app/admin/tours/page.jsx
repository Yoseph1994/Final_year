import AdminAllToursTable from "@/components/uiComponents/AdminAllToursTable";
import AdminPriceSliderFilter from "@/components/uiComponents/AdminPriceSliderFilter";
import AdminTourSearchInput from "@/components/uiComponents/AdminToursSearchInput";
import AdminUsersFilter from "@/components/uiComponents/AdminUsersFilter";
import Spinner from "@/components/uiComponents/Spinner";
import { getAllTours } from "@/lib/actions/tours";
import { Suspense } from "react";

async function page() {
  const toursRes = await getAllTours({ tours: true });
  const tours = toursRes ? await JSON.parse(toursRes) : [];
  return (
    <div className="flex flex-col gap-3">
      <span className="flex max-sm:flex-col max-sm:gap-2 justify-between items-center">
        <h1 className="text-2xl font-bold">All Tours</h1>
        <AdminUsersFilter />
        <AdminPriceSliderFilter />
        <AdminTourSearchInput />
      </span>

      <div className="max-h-[500px] overflow-y-auto">
        <Suspense fallback={<Spinner height={50} />}>
          <AdminAllToursTable tours={tours} />
        </Suspense>
      </div>
    </div>
  );
}

export default page;
