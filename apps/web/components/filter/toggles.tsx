"use client";

import { twMerge } from "tailwind-merge";
import { useFilterContext } from "./filter-context";
import CheckMark from "@components/icons/check-mark";

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
              "hover:dark:bg-primary-elevated-dark/50 hover:bg-primary-elevated-light/25",
            )}
            data-checked={value}
          >
            <div
              className={twMerge(
                "relative h-5 w-5 rounded border-2 bg-transparent",
                "border-slate-600 dark:border-slate-400",
                "group-data-[checked=true]:bg-primary group-data-[checked=true]:border-0",
              )}
            >
              <CheckMark
                className="fill-font-dark dark:fill-font-light absolute inset-0 m-auto group-data-[checked=false]:hidden"
                size={14}
              />
            </div>
            {title}
          </label>
        </div>
      ))}
    </div>
  );
}
