import AdminAllUsersTable from "@/components/uiComponents/AdminAllUsersTable";
import AdminUserSearchInput from "@/components/uiComponents/AdminUserSearchInput";
import AdminUsersFilterComp from "@/components/uiComponents/AdminUsersFilterComp";
import Spinner from "@/components/uiComponents/Spinner";
import {
  fetchAllUserAdmin,
  findUserById,
  getAllUsers,
} from "@/lib/actions/users";
import React, { Suspense } from "react";

async function page() {
  const users = await fetchAllUserAdmin();
  const meRes = await findUserById();
  const me = meRes && JSON.parse(meRes);
  return (
    <div className="flex flex-col gap-3">
      <span className="flex max-sm:flex-col max-sm:gap-2 justify-between items-center">
        <h1 className="text-2xl font-bold">All Users</h1>
        <AdminUsersFilterComp />
        <AdminUserSearchInput />
      </span>
      <div className="max-h-[540px] overflow-y-auto no-scrollbar">
        <Suspense fallback={<Spinner height={50} />}>
          <AdminAllUsersTable users={users} me={me} />
        </Suspense>
      </div>
    </div>
  );
}

export default page;
