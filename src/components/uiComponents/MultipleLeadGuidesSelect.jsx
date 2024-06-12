"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { addLeadGuides } from "@/slices/imagesSlice";

function MultipleLeadGuidesSelect({ guides }) {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const options = event.target.options;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    dispatch(addLeadGuides(selected));
  };

  return (
    <span className="flex flex-col gap-1">
      <select
        multiple
        className="flex flex-col gap-3 outline-none bg-slate-100 no-scrollbar"
        onChange={handleChange}
      >
        {guides.map((guide, idx) => (
          <option value={guide._id} key={idx} className="mt-1 p-1 bg-slate-50">
            {idx + 1}: {guide.name}
          </option>
        ))}
      </select>
    </span>
  );
}

export default MultipleLeadGuidesSelect;
