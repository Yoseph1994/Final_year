import React from "react";

function loading() {
  return (
    <div className="grid grid-cols-9 h-[700px] mt-5 gap-5 max-w-[1400px] mx-auto">
      <div className="col-span-3 h-full w-full bg-gray-300 animate-pulse"></div>
      <div className="col-span-6 h-full w-full grid grid-cols-3 gap-5">
        <div className="bg-gray-300 animate-pulse max-h-[300px]"></div>
        <div className="bg-gray-300 animate-pulse col-span-2 max-h-[400px]"></div>
        <div className="bg-gray-300 animate-pulse col-span-2 max-h-[300px]"></div>
        <div className="bg-gray-300 animate-pulse max-h-[300px]"></div>
      </div>
    </div>
  );
}

export default loading;
