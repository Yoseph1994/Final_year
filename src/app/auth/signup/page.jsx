import { Button } from "@/components/ui/button";
import NavbarLogo from "@/components/uiComponents/NavbarLogo";
import SignupForm from "@/components/uiComponents/SignupForm";
import Link from "next/link";

function page() {
  return (
    <div className="min-h-screen flex items-start justify-center h-dvh relative w-full max-w-[400px] mx-auto">
      {/* {isLoading && (
        <div className="absolute left-0 right-0 bottom-0 top-0 m-auto w-dvw h-dvh flex items-center justify-center">
          <Spinner />
        </div>
      )} */}
      <div className="flex flex-col mt-5 justify-center items-center gap-3 w-full md:min-w-[400px] sm:w-full sm:max-w-[90%] p-5 bg-white rounded-lg shadow-lg shadow-primary border">
        <NavbarLogo />
        <p className="font-serif">Welcome</p>
        <p className="font-serif font-medium text-sm">SIGN UP</p>
        <SignupForm />
        <p className="text-sm">
          Already have an account?
          <Link href={"/auth/signin"} className="font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default page;
