import AdminTourUpdate from "@/components/uiComponents/AdminTourUpdate";
import ErrorAlert from "@/components/uiComponents/ErrorAlert";
import { fetchGuides, fetchLeadGuides } from "@/lib/actions/users";
import { fetchTourById } from "@/lib/actions/tours";
import React from "react";

async function page({ params }) {
  const tourId = params.tourId;
  const tourRes = await fetchTourById(tourId);
  const tour = tourRes ? JSON.parse(tourRes) : null;
  const guidesRes = await fetchGuides();
  const guides = guidesRes ? JSON.parse(guidesRes) : [];
  const leadGuidesRes = await fetchLeadGuides();
  const leadGuides = leadGuidesRes ? JSON.parse(leadGuidesRes) : [];

  return (
    <div>
      {tour ? (
        <AdminTourUpdate tour={tour} guides={guides} leadGuides={leadGuides} />
      ) : (
        <ErrorAlert
          description={"Please check you connection and try again."}
        />
      )}
    </div>
  );
}

export default page;
