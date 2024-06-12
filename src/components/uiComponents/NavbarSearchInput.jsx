"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const ComboBox = ({ tours }) => {
  // State for the input value and filtered suggestions
  const [inputValue, setInputValue] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  // Handle change in input
  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Filter the suggestions based on the input value
    const filtered = tours.filter((tour) =>
      tour.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSuggestions(filtered);
  };

  return (
    <div className="relative flex-1 max-w-[600px]">
      <input
        type="text"
        id="Search"
        value={inputValue}
        onChange={handleChange}
        placeholder="Search for..."
        className="w-full rounded-md border text-black border-black/50 indent-3 py-2.5 text-sm font-medium pe-10 outline-none shadow-sm sm:text-sm"
      />

      <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
        <button type="button" className="text-black">
          <span className="sr-only">Search</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </span>

      {inputValue && filteredSuggestions.length > 0 && (
        <div className="absolute z-50 text-black w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto mt-1">
          {filteredSuggestions.map((suggestion, index) => (
            <Link
              href={`/tour/${suggestion._id}`}
              key={index}
              className="p-2 hover:bg-gray-200 cursor-pointer flex gap-2"
              onClick={() => {
                setInputValue(suggestion.name);
                setFilteredSuggestions([]);
              }}
            >
              <Image
                src={suggestion.imageCover}
                width={50}
                height={50}
                alt={suggestion.name}
              />
              <b>{suggestion.name}</b>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ComboBox;
