"use client";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FaCloudUploadAlt } from "react-icons/fa";
import { addImages } from "@/slices/imagesSlice";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { Separator } from "../ui/separator";

function ImagesUpload() {
  const dispatch = useDispatch();
  const { images } = useSelector((state) => state.images);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 8) {
      return toast.error("only 8 file is allowed.");
    }
    for (let i = 0; i < acceptedFiles.length; i++) {
      const changeFileFormat = new FileReader();
      changeFileFormat.readAsDataURL(acceptedFiles[i]);
      changeFileFormat.onload = () => {
        dispatch(addImages(changeFileFormat.result));
      };
    }
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
            <small>Max 8 Images</small>
          </>
        )}
      </div>
      <Separator />
      {images?.length > 0 && (
        <div className="no-scrollbar p-2 flex gap-4 overflow-x-auto">
          {images.map((image, idx) => (
            <Image
              key={idx}
              width={300}
              height={300}
              src={image}
              className="h-16 w-16 object-contain border rounded-md shadow-md"
              alt="uploaded image"
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ImagesUpload;
