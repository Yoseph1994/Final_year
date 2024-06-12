"use client";
import { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import NavbarLogo from "./NavbarLogo";
import navItems from "@/lib/navItems";
import { signUserOut } from "@/lib/actions/users";

const NavbarSheet = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <nav className="bg-primary flex justify-between items-center p-4">
        <div className="sm:hidden flex items-center">
          <button onClick={toggleSidebar} className="text-white text-2xl">
            <FaBars />
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="sm:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex flex-col items-center">
          <div className="bg-white w-full h-full flex flex-col p-4">
            <div className="flex justify-end">
              <button onClick={toggleSidebar} className="text-2xl text-black">
                <FaTimes />
              </button>
            </div>

            <NavbarLogo />
            <Link
              href={"/"}
              className="bg-primary rounded-md py-2 px-4 text-center text-[16px] text-white mt-5"
              onClick={toggleSidebar}
            >
              Home
            </Link>
            {user ? (
              <div className="flex flex-col gap-3 mt-3 h-[95vh]">
                {navItems.map((data, idx) => (
                  <Link
                    key={idx}
                    href={data.link}
                    className="bg-primary rounded-md py-2 px-4 text-center text-[16px] text-white"
                    onClick={toggleSidebar}
                  >
                    {data.label}
                  </Link>
                ))}
                <Link
                  href={"/user/profile"}
                  className="bg-primary rounded-md py-2 px-4 text-center text-[16px] text-white"
                  onClick={toggleSidebar}
                >
                  Profile
                </Link>

                <Link
                  href={"/user/tours"}
                  className="bg-primary rounded-md py-2 px-4 text-center text-[16px] text-white"
                  onClick={toggleSidebar}
                >
                  My tours
                </Link>

                {user?.role.toLowerCase() != "user" && (
                  <Link
                    href={"/admin/dashboard"}
                    className="bg-primary rounded-md py-2 px-4 text-center text-[16px] text-white"
                    onClick={toggleSidebar}
                  >
                    Dashboard
                  </Link>
                )}
                <form
                  action={signUserOut}
                  className="font-bold text-black text-center mt-auto"
                >
                  <button className="w-full my-2" type="submit">
                    Log out
                  </button>
                </form>
              </div>
            ) : (
              <div className="mx-2 flex gap-3 items-center mt-2">
                <Link
                  href={"/auth/signin"}
                  className="bg-primary w-full rounded-md py-2 px-4 text-center text-[16px] text-white"
                  onClick={toggleSidebar}
                >
                  Log in
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarSheet;
