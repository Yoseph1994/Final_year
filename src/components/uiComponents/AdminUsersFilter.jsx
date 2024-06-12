"use client";
import {
  useRouter,
  useSearchParams,
  usePathname,
} from "next/navigation";

export default function AdminUsersFilter() {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);

  const setParam = (active, value) => {
    params.set(active, value);
    replace(`${pathname}?${params}`);
  };

  const handleChange = (e) => {
    if (e.target.checked) {
      const isDiffExist = searchParams.has("diff");
      if (isDiffExist) {
        const existPrams = searchParams.get("diff")?.split(",");
        const existQuery = existPrams?.find((p) => p == e.target.name);
        if (existQuery) {
          return;
        }
        existPrams?.push(e.target.name.toString());
        const stringFromParam = existPrams?.toString().split(",").join(",");
        setParam("diff", stringFromParam);
      } else {
        //create new diff query with the values from
        setParam("diff", e.target.name);
      }
    } else {
      const existPrams = searchParams.get("diff")?.split(",");
      if (existPrams?.length < 2) {
        params.delete("diff");
        replace(`${pathname}?${params}`);
        return;
      }
      const existQuery = existPrams?.filter((p) => p != e.target.name);
      const stringFromParam = existQuery?.toString().split(",").join(",");
      setParam("diff", stringFromParam);
    }
  };


  return (
    <div className="flex gap-8">
      <div className="relative">
        <details className="group [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600">
            <span className="text-sm font-medium"> Difficulty </span>

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

          <div className="z-50 group-open:absolute group-open:start-0 group-open:top-auto group-open:mt-2">
            <div className="rounded border border-gray-200 bg-white w-fit">
              <ul className="space-y-1 border-t border-gray-200 p-4 w-fit">
                {["Easy", "Medium", "Difficult"].map((level) => {
                  const id = `Filter${level}`;
                  return (
                    <li key={id}>
                      <label
                        htmlFor={id}
                        className="inline-flex items-center gap-2"
                      >
                        <input
                          name={level.toLowerCase()}
                          type="checkbox"
                          id={id}
                          onChange={handleChange}
                          className="size-5 rounded border-gray-300"
                        />
                        <span className="text-sm font-medium text-gray-700">
                          {level}
                        </span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </details>
      </div>
    </div>
  );
}
