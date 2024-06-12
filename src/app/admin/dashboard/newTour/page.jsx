import AdminTourForm from "@/components/uiComponents/AdminTourForm";
import ErrorAlert from "@/components/uiComponents/ErrorAlert";
import Spinner from "@/components/uiComponents/Spinner";
import { fetchGuides, fetchLeadGuides } from "@/lib/actions/users";
import React, { Suspense } from "react";

async function page() {
  const guidesRes = await fetchGuides();
  const guides = guidesRes ? JSON.parse(guidesRes) : [];
  const leadGuidesRes = await fetchLeadGuides();
  const leadGuides = leadGuidesRes ? JSON.parse(leadGuidesRes) : [];



  return (
    <div className="flex flex-col gap-3">
      <div className="w-full pl-5 py-4 flex flex-col bg-slate-100">
        <b className="text-xl">Create a Tour</b>
        <p className="text-sm text-slate-600">
          please fill all required fields.
        </p>
      </div>
      {guides.length > 0 ? (
        <Suspense fallback={<Spinner />}>
          <AdminTourForm guides={guides} leadGuides={leadGuides} />
        </Suspense>
      ) : (
        <ErrorAlert
          safe={true}
          info={true}
          description={"Couldn't find any guide."}
        />
      )}
    </div>
  );
}

export default page;
