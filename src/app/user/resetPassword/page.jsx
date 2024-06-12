"use client";
import { Button } from "@/components/ui/button";
import NavbarLogo from "../../../components/uiComponents/NavbarLogo";
import Image from "next/image";
import { useEffect, useState } from "react";
import { changePassword } from "@/lib/actions/users";
import { useFormState, useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Spinner from "@/components/uiComponents/Spinner";

function usePage() {
  const [state, formAction] = useFormState(changePassword, null);
  const [token, setToken] = useState("");
  const searchParams = useSearchParams();
  const { push } = useRouter();
  useEffect(() => {
    const userToken = searchParams.get("token");
    setToken(userToken);
    if (state?.success) {
      toast.success(state.success);
      push("/auth/signin");
    } else if (state?.error) {
      toast.error(state.error);
    }
  }, [state]);

  const Submit = () => {
    const { pending } = useFormStatus();
    return (
      <Button className="w-full text-white p-2 rounded-md" disabled={pending}>
        {pending ? <Spinner height={30} /> : "Change Password"}
      </Button>
    );
  };
  return (
    <div className="w-full border bg-slate-50 p-6 rounded-md shadow-md flex flex-col md:flex-row items-center justify-between">
      <div className="w-full md:w-1/2">
        <div className="max-w-xs mx-auto">
          <NavbarLogo />
          <h2 className="text-lg font-bold mb-4">Reset Your password</h2>
          <form action={formAction}>
            <input type="hidden" name="token" value={token} />
            <label htmlFor="email" className="block mt-2 text-sm font-bold">
              New Password
            </label>
            <input
              type="password"
              required
              name="password"
              id="email"
              className="w-full p-2 border border-gray-300 rounded-md mb-4 outline-none"
              placeholder="Enter your New Password"
            />

            <label htmlFor="email" className="block text-sm font-bold">
              Confirm Password
            </label>
            <input
              type="password"
              required
              id="email"
              name="confirmPassword"
              className="w-full p-2 border border-gray-300 rounded-md mb-4 outline-none"
              placeholder="Confirm Password"
            />
            <div className="flex flex-col gap-2">
              <Submit />
              <Link
                href={"/auth/signin"}
                className="w-full text-white p-2 rounded-md bg-red-500 hover:bg-red-600 text-center"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
      <div className="w-full md:w-1/2 mt-6 md:mt-0 flex justify-center max-h-[600px]">
        <Image
          width={500}
          height={500}
          src="https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dHJhdmVsfGVufDB8fDB8fHww"
          alt="Phone Mockup"
          className="max-w-full h-auto object-cover"
        />
      </div>
    </div>
  );
}

export default usePage;
