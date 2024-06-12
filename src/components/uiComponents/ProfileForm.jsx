"use client";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useFormStatus, useFormState } from "react-dom";
import Spinner from "./Spinner";
import { toast } from "react-toastify";
import { updateUser } from "@/lib/actions/users";

function ProfileForm({ user }) {
  const [state, formAction] = useFormState(updateUser, null);
  const [photo, setPhoto] = useState(false);

  useEffect(() => {
    if (state?.success) {
      toast.success(state.success);
      window.location.reload();
    }
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state]);

  const onDrop = useCallback((acceptedFiles) => {
    const changeFileFormat = new FileReader();
    changeFileFormat.readAsDataURL(acceptedFiles[0]);
    changeFileFormat.onload = () => {
      setPhoto(changeFileFormat.result);
    };
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const Submit = () => {
    const { pending } = useFormStatus();
    return (
      <Button type="submit" disabled={pending} className="relative">
        {pending ? <Spinner height={30} /> : "Update"}
      </Button>
    );
  };

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <input
        type="hidden"
        name="photo"
        value={photo ? JSON.stringify(photo) : false}
      />
      <div className="p-5 bg-white grid grid-cols-4 gap-2 sm:gap-1 rounded-lg border">
        <div className="col-span-4 sm:col-span-1">
          <b className="">Personal Information</b>
          <p className="text-slate-700 text-sm">
            Update your personal detail here.
          </p>
        </div>
        <div className="col-span-4 sm:col-span-3 bg-slate-50 rounded-md p-5 grid grid-cols-2 gap-7">
          <label htmlFor="fullname" className="flex flex-col col-span-2">
            <span className="font-semibold">Name</span>
            <input
              type="name"
              id="fullname"
              name="name"
              placeholder={user?.name}
              className="border-b border-black/50 bg-transparent outline-none py-1 text-sm focus:border-green-600"
            />
          </label>

          <label htmlFor="UserEmail" className="flex flex-col col-span-2">
            <span className="font-semibold">Email</span>
            <input
              type="email"
              name="email"
              disabled
              id="UserEmail"
              placeholder={user?.email}
              className="border-b border-black/50 bg-transparent outline-none py-1 text-sm focus:border-green-600"
            />
          </label>
        </div>
      </div>

      <div className="p-5 bg-white grid grid-cols-4 gap-2 sm:gap-1 rounded-lg border">
        <div className="col-span-4 sm:col-span-1">
          <b className="">Profile Photo</b>
          <p className="text-slate-700 text-sm whitespace-pre-line">
            This image will be displayed on your profile.
          </p>
        </div>
        <div className="col-span-4 sm:col-span-3 bg-slate-50 rounded-md p-5 grid grid-cols-6 gap-7">
          <div className="col-span-6 sm:col-span-1 flex flex-col">
            <Avatar className="size-14 overflow-hidden">
              <AvatarImage
                src={user?.photo || "https://github.com/shadcn.png"}
                className="size-14 rounded-full"
              />
              <AvatarFallback>B</AvatarFallback>
            </Avatar>
            {photo && (
              <div className="mt-auto">
                <small>
                  <b>New Image</b>
                </small>
                <Avatar className="size-14 overflow-hidden">
                  <AvatarImage src={photo} className="size-14 rounded-full" />
                  <AvatarFallback>B</AvatarFallback>
                </Avatar>
              </div>
            )}
          </div>
          <div className="col-span-6 sm:col-span-5 bg-white p-5 rounded-lg font-medium cursor-pointer">
            <div
              {...getRootProps()}
              className="flex flex-col items-center justify-center"
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
                  <p>JPG, PNG, of GIF (Max size 2MB)</p>
                </>
              )}
            </div>
          </div>
          <Button
            className="bg-slate-500 hover:bg-slate-400 text-white w-fit px-2 py-2 ml-auto col-span-6"
            size="small"
            disabled={!photo}
            onClick={() => setPhoto("")}
          >
            Cancel
          </Button>
        </div>
      </div>

      <div className="p-5 bg-white grid grid-cols-4 gap-1 rounded-lg border">
        <div className="col-span-4 sm:col-span-1">
          <b className="">Password</b>
          <p className="text-slate-700 text-sm">
            Enter your the password to make update.
          </p>
        </div>
        <div className="col-span-4 sm:col-span-3 bg-slate-50 rounded-md p-5 flex flex-col gap-7">
          <label htmlFor="password" className="flex flex-col">
            <span className="font-semibold">Password</span>
            <input
              type="password"
              name="currentPassword"
              id="password"
              placeholder="password"
              className="border-b border-black/50 bg-transparent outline-none py-1 text-sm focus:border-green-600"
            />
          </label>

          <label htmlFor="newPassword" className="flex flex-col">
            <span className="font-semibold">Confirm Password</span>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              placeholder="New Password"
              className="border-b border-black/50 bg-transparent outline-none py-1 text-sm focus:border-green-600"
            />
          </label>
        </div>
        <Submit />
      </div>
    </form>
  );
}

export default ProfileForm;
