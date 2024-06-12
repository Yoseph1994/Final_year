import AdminTourUpdate from "@/components/uiComponents/AdminTourUpdate";
import ErrorAlert from "@/components/uiComponents/ErrorAlert";
import { fetchTourById } from "@/lib/actions/tours";
import React from "react";

async function page({ params }) {
  const tourId = params.tourId;
  const tourRes = await fetchTourById(tourId);
  const tour = tourRes ? JSON.parse(tourRes) : null;

  return (
    <div>
      {tour ? (
        <AdminTourUpdate tour={tour} />
      ) : (
        <ErrorAlert
          description={"Please check you connection and try again."}
        />
      )}
    </div>
  );
}

export default page;
