"use client";
import { Bars } from "react-loader-spinner";

function Spinner({ height }) {
  return (
    <div className="flex items-center justify-center">
      <Bars
        height={height || 80}
        width="80"
        color="#00A8E1"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}

export default Spinner;
