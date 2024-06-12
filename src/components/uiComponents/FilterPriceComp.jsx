"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

function FilterPriceComp() {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);

  const handleChange = (e) => {
    params.set("price", e.target.value);
    replace(`${pathname}?${params}`);
  };
  return (
    <>
      <div className="relative w-full max-w-[150px]">
        <details className="group [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600">
            <span className="text-sm font-medium"> Price </span>

            <span className="transition group-open:-rotate-180">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
          </summary>

          <div className="z-50 group-open:absolute group-open:start-0 group-open:top-auto group-open:mt-2 bg-white px-3 w-full">
            <div className="flex gap-2">
              <input
                type="radio"
                id="100to2500"
                name="price"
                value="100to2500"
                onChange={handleChange}
              />
              <label for="100to2500">100 - 2500</label>
            </div>

            <div className="flex gap-2">
              <input
                type="radio"
                id="2500t05000"
                name="price"
                value="2500t05000"
                onChange={handleChange}
              />
              <label for="2500to5000">2500 - 5000</label>
            </div>

            <div className="flex gap-2">
              <input
                type="radio"
                id="over5000"
                name="price"
                value="over5000"
                onChange={handleChange}
              />
              <label for="over5000">over 5000</label>
            </div>

            <div className="flex gap-2">
              <input
                type="radio"
                id="all"
                name="price"
                value="all"
                onChange={handleChange}
              />
              <label for="all">All</label>
            </div>
          </div>
        </details>
      </div>
    </>
  );
}

export default FilterPriceComp;
