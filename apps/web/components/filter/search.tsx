"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { twMerge } from "tailwind-merge";

import { useFilterContext } from "./filter-context";

export default function SearchFilter() {
  const { search, updateSearch } = useFilterContext();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    updateSearch(event.target.value);
  }

  return (
    <div className="relative">
      <MagnifyingGlassIcon className="absolute bottom-0 left-3 top-0 my-auto h-5 w-5" />
      <input
        type="search"
        className={twMerge(
          "border-gray-300 text-gray-900",
          "ring-teal-700 dark:text-white dark:placeholder-gray-400",
          "w-full border-b-2 bg-transparent p-3 pl-10 text-lg outline-hidden ring-inset focus:ring-2",
        )}
        onChange={handleChange}
        placeholder="Sök"
        value={search}
      />
    </div>
  );
}
