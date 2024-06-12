"use client";

import { changeBookedTourStatus } from "@/lib/actions/book";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Error() {
  const searchParam = useSearchParams();
  useEffect(() => {
    const id = searchParam.get("id");
    const cancelBook = async () => {
      await changeBookedTourStatus(id, "canceled");
    };
    if (id) {
      cancelBook();
    }
  }, []);
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8 text-center">
        <svg
          className="w-16 h-16 mx-auto mb-4 text-red-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        <h1 className="text-2xl font-bold text-gray-800">Payment Failed</h1>
        <p className="mt-4 text-gray-600">
          Unfortunately, your payment could not be processed.
        </p>
        <a
          href="/"
          className="mt-6 inline-block px-6 py-3 text-white bg-primary rounded-md hover:bg-primary-dark"
        >
          Go to Home
        </a>
      </div>
    </div>
  );
}
