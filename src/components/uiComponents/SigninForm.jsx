"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { useFormState, useFormStatus } from "react-dom";
import { loginUser } from "@/lib/actions/users";
import Spinner from "./Spinner";
import { IoEyeOff, IoEye } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function SigninForm() {
  const { replace } = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // const [state, formAction] = useFormState(loginUser, null);
  const [info, setInfo] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await loginUser(info);
    setLoading(false);

    if (res?.success) {
      toast.success("logged in successfully");
      replace("/");
      return;
    } else if (res?.error) toast.error(res.error);
    else {
      toast.error("You reach the request limit. please try after 10 minutes");
    }
  };

  const handleChange = async (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
      <span className="flex flex-col gap-2">
        <p className="font-semibold">Email:</p>
        <input
          type="email"
          name="email"
          onChange={(e) => handleChange(e)}
          placeholder="Email"
          required
          className="border py-2 bg-slate-50 rounded-md indent-2 outline-none focus:bg-white"
        />
      </span>
      <span className="relative flex">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          required
          onChange={(e) => handleChange(e)}
          className="border py-2 bg-slate-50 w-full rounded-md indent-2 outline-none focus:bg-white"
        />
        {showPassword ? (
          <IoEyeOff
            className="absolute top-0 bottom-0 my-auto right-2 text-xl"
            onClick={() => setShowPassword(!showPassword)}
          />
        ) : (
          <IoEye
            className="absolute top-0 bottom-0 my-auto right-2 text-xl"
            onClick={() => setShowPassword(!showPassword)}
          />
        )}
      </span>
      <Link
        href={"/user/forgotPassword"}
        className="text-sm ml-auto my-2 font-medium"
      >
        Forgot Password
      </Link>
      <Button type="submit" disabled={loading} className="relative">
        {loading ? <Spinner height={30} /> : "Sign in"}
      </Button>
    </form>
  );
}
