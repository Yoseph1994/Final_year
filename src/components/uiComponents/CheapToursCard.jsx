import Image from "next/image";
import Link from "next/link";

function CheapToursCard({ data }) {
  return (
    <Link
      href={`/tour/${data._id}`}
      className="group relative block bg-black h-[300px] rounded-xl w-[280px] flex-shrink-0"
    >
      <Image
        width={500}
        height={500}
        alt={data.name}
        src={data.imageCover}
        className="absolute inset-0 h-full w-full object-cover opacity-75 rounded-xl transition-opacity group-hover:opacity-50"
      />

      <div className="relative p-4 flex flex-col justify-between h-full">
        <span>
          <p className="text-sm font-bold uppercase tracking-tighter bg-white w-fit p-1">
            ${data.price}
          </p>

          <p className="text-xl font-bold text-white sm:text-2xl line-clamp-1">
            {data.name}
          </p>
        </span>

        <div className="">
          <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
            <p className="text-sm text-white line-clamp-5">
              {data.description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CheapToursCard;
