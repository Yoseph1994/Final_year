"use client";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { registerUser } from "@/lib/actions/users";
import { toast } from "react-toastify";
import { useFormStatus } from "react-dom";
import Spinner from "./Spinner";

function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [state, formAction] = useFormState(registerUser, null);

  useEffect(() => {
    if (state?.success) {
      toast.success(state.success);
    } else {
      toast.error(state?.error);
    }
  }, [state]);

  const Submit = () => {
    const { pending } = useFormStatus();
    return (
      <Button type="submit" disabled={pending} className="relative">
        {pending ? <Spinner height={30} /> : "Sign up"}
      </Button>
    );
  };
  return (
    <form action={formAction} className="flex flex-col w-full gap-3">
      <span className="flex flex-col gap-2">
        <p className="font-semibold">Full Name:</p>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="border py-2 bg-slate-50 rounded-md indent-2 outline-none focus:bg-white"
        />
      </span>
      <span className="flex flex-col gap-2">
        <p className="font-semibold">Email:</p>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border py-2 bg-slate-50 rounded-md indent-2 outline-none focus:bg-white"
        />
      </span>
      <span className="flex flex-col gap-2">
        <p className="font-semibold">Password:</p>

        <span className="relative flex">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="border py-2 bg-slate-50 w-full h-full rounded-md indent-2 outline-none focus:bg-white"
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
      </span>
      <span className="flex flex-col gap-2">
        <p className="font-semibold">Confirm Password:</p>
        <span className="relative flex">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            className="border py-2 bg-slate-50 w-full h-full rounded-md indent-2 outline-none focus:bg-white"
          />
          {showConfirmPassword ? (
            <IoEyeOff
              className="absolute top-0 bottom-0 my-auto right-2 text-xl"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          ) : (
            <IoEye
              className="absolute top-0 bottom-0 my-auto right-2 text-xl"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          )}
        </span>
      </span>
      <Submit />
    </form>
  );
}

export default SignupForm;
