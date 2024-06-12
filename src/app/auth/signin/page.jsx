import { Button } from "@/components/ui/button";
import NavbarLogo from "@/components/uiComponents/NavbarLogo";
import SigninForm from "@/components/uiComponents/SigninForm";
import Link from "next/link";
import React from "react";

function page() {
  return (
    <div className="h-dvh flex items-start justify-center w-full max-w-[400px] mx-auto">
      <div className="flex flex-col justify-center mt-5 items-center gap-3 w-full mx-2 p-5 bg-white rounded-lg shadow-lg shadow-primary border md:min-w-[400px] sm:w-full sm:max-w-[90%]">
        <NavbarLogo />
        <p className="font-serif">Welcome back</p>
        <p className="font-serif font-medium text-sm">SIGN IN</p>
        <SigninForm />
        <p className="text-sm">
          Don{"'"}t have an account?{" "}
          <Link href={"/auth/signup"} className="font-medium hover:underline">
            Sign up
          </Link>
        </p>
        
      </div>
    </div>
  );
}

export default page;
