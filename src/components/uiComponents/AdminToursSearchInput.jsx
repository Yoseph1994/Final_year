"use client";
import { useRouter, useSearchParams } from "next/navigation";

function AdminTourSearchInput() {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const param = new URLSearchParams(searchParams);

  const handleChange = (e) => {
    if (e.target.value.length > 1) {
      if (searchParams.has("tour")) {
        param.delete("tour");
        param.set("tour", e.target.value);
        replace(`?${param}`);
      } else {
        param.set("tour", e.target.value);
        replace(`?${param}`);
      }
    } else {
      param.delete("tour");
      replace(`?${param}`);
    }
  };
  return (
    <div className="relative">
      <input
        type="text"
        id="Search"
        onChange={handleChange}
        placeholder="Search for tour"
        className="w-full rounded-md border border-gray-500 py-2.5 px-2 pe-10 shadow-sm sm:text-sm outline-none"
      />

      <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
        <button type="button" className="text-gray-600 hover:text-gray-700">

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
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </span>
    </div>
  );
}

export default AdminTourSearchInput;
