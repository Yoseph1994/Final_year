"use client";
import React, { useEffect, useState } from "react";
import TourCard from "./TourCard";
import { useSearchParams } from "next/navigation";

function AllTours({ reviews, tours }) {
  const searchParams = useSearchParams();
  const [filteredTours, setFilteredTours] = useState(tours);

  useEffect(() => {
    if (searchParams.has("ratingo")) {
      const filtered = reviews.filter((review) => {
        review.rating >= 3;
        return review.tour;
      });
      setFilteredTours(filtered);
    } else if (searchParams.has("ratingu")) {
      const filtered = reviews.filter((review) => {
        review.rating <= 3;
        return review.tour;
      });
      setFilteredTours(filtered);
    }
  }, [searchParams]);
  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredTours.map((tour, idx) => (
          <TourCard key={idx} data={tour} />
        ))}
      </div>
    </div>
  );
}

export default AllTours;