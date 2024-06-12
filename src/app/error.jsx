"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function ConnectionPage() {
  const [reload, setReload] = useState(false);
  useEffect(() => {
    if (reload) {
      location.reload();
    }
  }, [reload]);
  return (
    <div className="bg-blue-100 min-h-screen flex flex-col justify-center items-center">
      <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold mb-4">Oops! Connection Error</h1>
        <p className="text-gray-600 mb-6">
          We apologize, something went wrong please check your connection or try
          again.
        </p>
        <Button
          onClick={() => setReload(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300"
        >
          Retry
        </Button>
      </div>
    </div>
  );
}
