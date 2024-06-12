"use client";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaCloudUploadAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addCoverImage } from "@/slices/imagesSlice";
import Image from "next/image";
import { Separator } from "../ui/separator";

function PrimaryImageUpload() {
  const dispatch = useDispatch();
  const { coverImage } = useSelector((state) => state.images);
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 1) {
      return toast.error("only one file is allowed.");
    }
    const changeFileFormat = new FileReader();
    changeFileFormat.readAsDataURL(acceptedFiles[0]);
    changeFileFormat.onload = () => {
      dispatch(addCoverImage(changeFileFormat.result));
    };
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div>
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
      {coverImage && (
        <div>
          <Image
            width={300}
            height={300}
            src={coverImage}
            className="h-12 w-12 object-cover"
            alt="uploaded image"
          />
        </div>
      )}
    </div>
  );
}

export default PrimaryImageUpload;
