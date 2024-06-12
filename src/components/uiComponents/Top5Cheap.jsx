"use client";
import React, { useEffect, useRef } from "react";
import CheapToursCard from "./CheapToursCard";
import { useSearchParams } from "next/navigation";

function Top5Cheap({ top5Cheap }) {
  const top5cheapRef = useRef(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.has("cheap5tours")) {
      top5cheapRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [searchParams]);
  return (
    <div className="my-5" ref={top5cheapRef}>
      <span className="flex justify-between items-center">
        <b className="text-lg">Recommended Tours</b>
      </span>{" "}
      <div className="flex overflow-x-auto overflow-y-hidden height-[300px] py-3 gap-3 scrollbox">
        {top5Cheap.map((tour, idx) => (
          <CheapToursCard key={idx} data={tour} />
        ))}
      </div>
    </div>
  );
}

export default Top5Cheap;
