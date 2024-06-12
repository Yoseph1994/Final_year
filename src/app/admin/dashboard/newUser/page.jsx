import AminNewUser from "@/components/uiComponents/AdminNewUser";

function page() {
  return (
    <div className="flex flex-col gap-3 bg-slate-100 h-full p-3">
      <h1 className="font-bold text-2xl">New User</h1>
      <div className="w-full mx-auto">
        <AminNewUser />
      </div>
    </div>
  );
}

export default page;
