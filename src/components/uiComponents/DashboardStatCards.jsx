import Link from "next/link";
import React from "react";

function DashboardStatCards({ icon, title, amount, link }) {
  return (
    <>
      <article className="flex items-end justify-between rounded-lg shadow-md bg-white p-6">
        <div className="flex items-center gap-4">
          {icon}

          <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-medium text-gray-900">{amount}</p>
          </div>
        </div>

        <div className="inline-flex gap-2 rounded bg-green-100 p-1 text-black">
          <Link href={`/admin/${link}`} className="text-xs font-medium">
            see all
          </Link>
        </div>
      </article>
    </>
  );
}

export default DashboardStatCards;
