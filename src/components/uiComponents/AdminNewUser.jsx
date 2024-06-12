"use client";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Button } from "../ui/button";
import { useCallback, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { adminCreateAccount } from "@/lib/actions/users";
import { toast } from "react-toastify";
import { useFormStatus } from "react-dom";
import Spinner from "./Spinner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDropzone } from "react-dropzone";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Separator } from "../ui/separator";
import Image from "next/image";
import { useRouter } from "next/navigation";

function AminNewUser() {
  const { push } = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [state, formAction] = useFormState(adminCreateAccount, null);
  const [image, setImage] = useState("");

  useEffect(() => {
    if (state?.success) {
      toast.success(state.success);
      push("/admin/users");
    } else {
      toast.error(state?.error);
    }
  }, [state]);

  const Submit = () => {
    const { pending } = useFormStatus();
    return (
      <Button type="submit" disabled={pending} className="relative w-fit">
        {pending ? <Spinner height={30} /> : "Create"}
      </Button>
    );
  };

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 1) {
      return toast.error("only one file is allowed.");
    } else {
      const changeFileFormat = new FileReader();
      changeFileFormat.readAsDataURL(acceptedFiles[0]);
      changeFileFormat.onload = () => {
        setImage(changeFileFormat.result);
      };
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <form action={formAction} className="grid grid-cols-2 w-full gap-3">
      <input type="hidden" name="photo" value={image} />
      <div className="col-span-2 shadow-md p-8 bg-white h-fit">
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

        <h1 className="font-semibold mt-2">Select Role</h1>
        <Select name="role">
          <SelectTrigger className="">
            <SelectValue placeholder="Select a Role for user" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Role</SelectLabel>
              <SelectItem value="guide">Guide</SelectItem>
              <SelectItem value="lead-guide">Lead-Guide</SelectItem>
              <SelectItem value="user">User</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="col-span-2 shadow-md p-8 bg-white">
        <span className="flex flex-col gap-2">
          <p className="font-semibold">Password:</p>

          <span className="relative flex">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="border py-2 bg-slate-50 rounded-md indent-2 outline-none focus:bg-white w-full"
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
              className="border py-2 bg-slate-50 rounded-md indent-2 outline-none focus:bg-white w-full"
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

        <h1 className="font-semibold mt-4 mb-2">Select Profile</h1>
        <div className="flex flex-col gap-5 border p-2">
          <div
            {...getRootProps()}
            className="flex flex-col items-center justify-center text-sm"
          >
            <input {...getInputProps()} />

            {isDragActive ? (
              <b>Drop the files here ...</b>
            ) : (
              <>
                <span className="p-2 ring-1 rounded-full mb-2">
                  <FaCloudUploadAlt size={54} className="text-sky-500" />
                </span>
                <p>
                  <b>Click to upload</b> or drag and drop
                </p>
                <p>JPG, PNG, of GIF</p>
                <small>Only 1 Image is allowed.</small>
              </>
            )}
          </div>
          <Separator />
          {image && (
            <Image
              width={300}
              height={300}
              src={image}
              className="h-12 w-12 object-cover"
              alt="uploaded image"
            />
          )}
        </div>
      </div>
      <Submit />
    </form>
  );
}

export default AminNewUser;
