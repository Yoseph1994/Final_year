import React from "react";

function ErrorAlert({ description, info, safe }) {
  return (
    <>
      {!info ? (
        <div
          role="alert"
          className="rounded border-s-4 border-red-500 bg-red-50 p-4"
        >
          <strong className="block font-medium text-red-800">
            Something went wrong
          </strong>

          <p className="mt-2 text-sm text-red-700">{description}</p>
        </div>
      ) : (
        <div
          role="alert"
          className="rounded border-s-4 border-blue-500 bg-blue-50 p-4"
        >
          {!safe && (
            <strong className="block font-medium text-blue-800">
              Something went wrong
            </strong>
          )}

          <p className="mt-2 text-sm text-blue-700">{description}</p>
        </div>
      )}
    </>
  );
}

export default ErrorAlert;
