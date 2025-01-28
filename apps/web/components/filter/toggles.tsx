"use client";

import { twMerge } from "tailwind-merge";

import CheckMark from "@components/icons/check-mark";

import { useFilterContext } from "./filter-context";

export default function SearchToggles() {
  const { toggles, updateToggle } = useFilterContext();

  return (
    <div>
      {Object.entries(toggles).map(([key, { title, value }]) => (
        <div key={key}>
          <input
            type="checkbox"
            id={`checkbox-${key}`}
            checked={value}
            onChange={function (event) {
              updateToggle(key, event.target.checked);
            }}
            className={twMerge("hidden")}
          />
          <label
            htmlFor={`checkbox-${key}`}
            className={twMerge(
              "group flex w-full cursor-pointer items-center gap-3 p-3 text-sm font-medium",
              "text-gray-900 transition-[background-color] dark:text-gray-300",
              "hover:bg-teal-600/25 dark:hover:bg-slate-900/50",
            )}
            data-checked={value}
          >
            <div
              className={twMerge(
                "relative h-4 w-4 rounded-sm border-[1.5px] bg-transparent",
                "border-slate-600 dark:border-slate-400",
                "group-data-[checked=true]:bg-teal-700 group-data-[checked=true]:border-0",
              )}
            >
              <CheckMark
                className="absolute inset-0 m-auto fill-slate-50 group-data-[checked=false]:hidden dark:fill-slate-950"
                size={12}
              />
            </div>
            {title}
          </label>
        </div>
      ))}
    </div>
  );
}
