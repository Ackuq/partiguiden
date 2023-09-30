import { twMerge } from "tailwind-merge";
import SearchFilter from "./search";
import SearchToggles from "./toggles";

export default function Filter() {
  return (
    <>
      <div
        className={twMerge(
          "overflow-y-scroll",
          "dark:bg-background-elevated-dark bg-white",
          "w-drawer translate-x-drawer fixed",
          "sm:top-header-sm-with-margin sm:max-h-full-without-header transform-none shadow-sm sm:sticky sm:h-min sm:w-auto sm:min-w-[17rem] sm:rounded-sm",
        )}
      >
        <SearchFilter />
        <SearchToggles />
      </div>
    </>
  );
}
