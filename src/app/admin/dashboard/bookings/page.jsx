import AdminAllBooking from "@/components/uiComponents/AdminAllBookings";
import AdminBookSearch from "@/components/uiComponents/AdminBookSearch";
import Spinner from "@/components/uiComponents/Spinner";
import { adminFindBooks } from "@/lib/actions/book";

import { Suspense } from "react";

async function page() {
  const bookRes = await adminFindBooks();
  const book = bookRes ? await JSON.parse(bookRes) : [];
  return (
    <div className="flex flex-col gap-3">
      <span className="flex max-sm:flex-col max-sm:gap-2 justify-between items-center">
        <h1 className="text-2xl font-bold">All Booked Tours</h1>
        <AdminBookSearch />
      </span>
      <div className="max-h-[540px] overflow-y-auto no-scrollbar">
        <Suspense fallback={<Spinner height={50} />}>
          <AdminAllBooking books={book} />
        </Suspense>
      </div>
    </div>
  );
}

export default page;
