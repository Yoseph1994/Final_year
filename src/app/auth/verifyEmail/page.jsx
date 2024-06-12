"use client";
import Spinner from "@/components/uiComponents/Spinner";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { verifyEmail } from "@/lib/actions/users";

function usePage() {
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const [status, setStatus] = useState("loading");
  useEffect(() => {
    const token = searchParams.get("token");
    const verifyEmailAction = async () => {
      const res = await verifyEmail(token);
      if (res?.success) {
        toast.success(res.success);
        setStatus("success");
        push("/auth/signin");
      } else if (res?.error) {
        setStatus("error");
      }
    };

    verifyEmailAction();
  }, []);
  return (
    <div className="bg-gray-100 w-full flex flex-col justify-center items-center h-fit p-20">
      <Image
        width={500}
        height={500}
        src="/assets/emailVerificationLogo.png"
        alt="email verification logo"
        className="max-w-[200px]"
      />
      {status == "error" && (
        <h1 className="text-3xl font-bold">
          Email verification link seems expired.
        </h1>
      )}
      {status == "success" && (
        <h1 className="text-3xl font-bold mb-40 text-center">
          your email is verified. <br />{" "}
          <span className="text-2xl">Please login to your account</span>
        </h1>
      )}
      {status == "loading" && (
        <p className="text-3xl font-bold mb-40">
          Your email is being verified please wait...
        </p>
      )}
      {status == "loading" && <Spinner />}
    </div>
  );
}

export default usePage;
