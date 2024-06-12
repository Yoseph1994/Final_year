import DashboardStatCards from "@/components/uiComponents/DashboardStatCards";
import { GiSubway } from "react-icons/gi";
import { FaUser, FaUserCheck, FaUserMinus } from "react-icons/fa";
import AdminSmallUsersTable from "@/components/uiComponents/AdminSmallUsersTable";
import { AdminPieChart } from "@/components/uiComponents/AdminPieChart";
import Link from "next/link";
import {
  getActiveUsers,
  getAllUsers,
  getInactiveUsers,
} from "@/lib/actions/users";
import { getAllTours } from "@/lib/actions/tours";
import { Suspense } from "react";
import Spinner from "@/components/uiComponents/Spinner";
import AdminSmallToursTable from "@/components/uiComponents/AdminSmallToursTable";

async function page() {
  const usersRes = await getAllUsers();
  const users = usersRes ? JSON.parse(usersRes) : [];
  const toursRes = await getAllTours({tours: false});
  const tours = toursRes ? JSON.parse(toursRes) : [];
  const activeUsersRes = await getActiveUsers();
  const activeUsers = activeUsersRes && JSON.parse(activeUsersRes);
  const inactiveUsersRes = await getInactiveUsers();
  const inactiveUsers = activeUsersRes && JSON.parse(inactiveUsersRes);


  return (
    <div className="flex flex-col p-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        <DashboardStatCards
          title={"Total Tours"}
          amount={tours?.length}
          link={"tours"}
          icon={<GiSubway size={20} />}
        />
        <DashboardStatCards
          title={"Total Users"}
          amount={users?.length}
          link={"users"}
          icon={<FaUser size={20} />}
        />
        <DashboardStatCards
          title={"Active Users"}
          amount={activeUsers?.length}
          link={"users?type=active"}
          icon={<FaUserCheck size={20} />}
        />
        <DashboardStatCards
          title={"InActive Users"}
          amount={inactiveUsers?.length}
          link={"users?type=inactive"}
          icon={<FaUserMinus size={20} />}
        />
      </div>
      <div className="grid grid-cols-11 gap-2">
        {/* for the 5 users and tours */}
        <div className="flex flex-col gap-4 col-span-11 sm:col-span-8">
          <span className="py-3">
            <span className="flex justify-between items-center py-1">
              <h1 className="text-xl font-bold">Users</h1>{" "}
              <Link
                href="/admin/users"
                className="text-sm font-semibold text-primary "
              >
                Sell all
              </Link>
            </span>
            <Suspense fallback={<Spinner height={50} />}>
              {" "}
              <AdminSmallUsersTable users={users} />
            </Suspense>
          </span>

          <span>
            <span className="flex justify-between items-center py-1">
              <h1 className="text-xl font-bold">Tours</h1>{" "}
              <Link
                href="/admin/users"
                className="text-sm font-semibold text-primary "
              >
                Sell all
              </Link>
            </span>

            <Suspense fallback={<Spinner height={50} />}>
              <AdminSmallToursTable tours={tours} />
            </Suspense>
          </span>
        </div>
        {/* for the right pie chart */}
        <div className="col-span-11 sm:col-span-3 w-full border mt-10">
          <Suspense fallback={<Spinner height={50} />}>
            <AdminPieChart tours={tours} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default page;
