"use client";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

function Pagination({ totalPage }) {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const params= new URLSearchParams(searchParams);

  const page = Number(searchParams.get("page")) || 1;

  const handlePrev = () => {
    params.set("page", page - 1);
    replace(`${pathname}?${params}`);
  };

  const handleNext = () => {
    params.set("page", page + 1);
    replace(`${pathname}?${params}`);
  };
  return (
    <div className="w-full flex justify-around py-4">
      <button
        disabled={page < 2}
        onClick={handlePrev}
        className="bg-primary text-white font-semibold py-1 px-3 rounded-sm flex gap-1 justify-center items-center"
      >
        <IoIosArrowBack className="font-lg py-0" /> Prev
      </button>
      <button
        disabled={totalPage === page}
        onClick={handleNext}
        className="bg-primary text-white font-semibold py-1 px-3 rounded-sm flex gap-1 justify-center items-center"
      >
        Next <IoIosArrowForward className="font-lg py-0" />
      </button>
    </div>
  );
}

export default Pagination;