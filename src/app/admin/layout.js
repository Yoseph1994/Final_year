import DashboardLayout from "@/components/uiComponents/DashboardLayout";
import { findUserById } from "@/lib/actions/users";
import React from "react";

async function layout({ children }) {
  const myInfoRes = await findUserById();
  const myInfo = myInfoRes && JSON.parse(myInfoRes);
  return (
    <div className="h-full w-full mx-auto grid grid-cols-11 gap-5">
      <div className="col-span-11 md:col-span-3 shadow-md">
        <DashboardLayout myInfo={myInfo} />
      </div>
      <div className="col-span-11 md:col-span-8 shadow-md p-2">{children}</div>
    </div>
  );
}

export default layout;
