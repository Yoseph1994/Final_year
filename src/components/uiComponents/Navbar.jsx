import { fetchAllToursToSearch } from "@/lib/actions/tours";
import NavbarLinks from "./NavbarLinks";
import NavbarLogo from "./NavbarLogo";
import NavbarSearchInput from "./NavbarSearchInput";
import NavbarSheet from "./NavbarSheet";
import NavbarUser from "./NavbarUser";
import { findUserById } from "@/lib/actions/users";

async function Navbar() {
  const toursRes = await fetchAllToursToSearch();
  const tours = toursRes ? JSON.parse(toursRes) : [];
  const userRes = await findUserById();
  const user = userRes && JSON.parse(userRes);
  return (
    <div className="flex w-full min-h-[70px] border-b border-slate-50 items-center justify-between lg:px-20 md:px-10 px-2 bg-primary text-white">
      <div className="flex gap-3 items-center mr-4">
        <span className="hidden max-md:flex">
          <NavbarSheet user={user} />
        </span>
        <span className="hidden sm:flex">
          <NavbarLogo />
        </span>
      </div>
      <div className="flex items-center">
        <span className="max-md:hidden">
          <NavbarLinks />
        </span>
      </div>
      <div className="flex-1 max-w-[500px] flex gap-3">
        <NavbarSearchInput tours={tours} />
        <NavbarUser />
      </div>
    </div>
  );
}

export default Navbar;
