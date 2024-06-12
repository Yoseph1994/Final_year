"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Spinner from "@/components/uiComponents/Spinner";

// pages/success.js
export default function Success() {
  const searchParams = useSearchParams();
  const session_id = searchParams.get("session_id");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session_id) {
      fetch(`${process.env.NEXT_PUBLIC_FRONTEND_DOMAIN}/api/webhook`, {
        method: "POST",
        body: JSON.stringify({ session_id }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.success) {
            setSuccess(true);
            setError(false);
          } else if (data?.error) {
            setError(true);
            setSuccess(false);
          }
          setLoading(false);
        });
    }
  }, [session_id]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      {loading && !success && !error ? (
        <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8 text-center my-auto flex flex-col gap-2 items-center">
          <Spinner />
          <p className="font-semibold">
            Working on your payment validation please wait...
          </p>
        </div>
      ) : !loading && success && !error ? (
        <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8 text-center my-auto">
          <svg
            className="w-16 h-16 mx-auto mb-4 text-primary"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <h1 className="text-2xl font-bold text-gray-800">
            Payment Successful
          </h1>
          <p className="mt-4 text-gray-600">
            Thankyou for your payment! Your transaction was successful.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block px-6 py-3 text-white bg-primary rounded-md hover:bg-primary-dark"
          >
            Go to Home
          </Link>
        </div>
      ) : (
        !loading &&
        !success &&
        error && (
          <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8 text-center my-auto">
            <svg
              className="w-16 h-16 mx-auto mb-4 text-red-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <h1 className="text-2xl font-bold text-red-500">Payment Failed</h1>
            <p className="mt-4 text-gray-600">Please try again later.</p>
            <Link
              href="/"
              className="mt-6 inline-block px-6 py-3 text-white bg-primary rounded-md hover:bg-primary-dark"
            >
              Go to Home
            </Link>
          </div>
        )
      )}
    </div>
  );
}
