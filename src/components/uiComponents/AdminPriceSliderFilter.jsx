"use client";
import { Slider } from "@/components/ui/slider";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

function AdminPriceSliderFilter() {
  const searchParam = useSearchParams();
  const [priceValue, setPriceValue] =
    useState(Number(searchParam.get("price")) || 500);
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParam);
  const handleChange = (e) => {
    setPriceValue(Number(e));
    params.set("price", String(e));
    replace(`?${params}`);
  };
  return (
    <>
      <div className="w-fit max-w-[300px] flex gap-8">
        <div className="relative w-full">
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

            <div className="w-[250px] p-2 bg-white z-50 group-open:absolute group-open:start-0 group-open:top-auto group-open:mt-2">
              <p className="text-medium mb-2 text-xl">
                ${priceValue.toLocaleString()}
              </p>
              <Slider
                defaultValue={[priceValue]}
                max={10000}
                step={1}
                className={"w-full text-primary"}
                color="red"
                onValueChange={handleChange}
              />
            </div>
          </details>
        </div>
      </div>
    </>
  );
}

export default AdminPriceSliderFilter;
