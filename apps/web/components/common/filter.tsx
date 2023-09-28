import { twMerge } from "tailwind-merge";

export default function Filter() {
  return (
    <>
      <div
        className={twMerge(
          "overflow-y-scroll",
          "bg-whitet dark:bg-background-elevated-dark",
          "w-drawer translate-x-drawer fixed",
          "sm:top-header-sm-with-margin sm:max-h-full-without-header transform-none shadow-sm sm:sticky sm:h-min sm:w-auto sm:min-w-[15rem] sm:rounded",
        )}
      >
        Hej
      </div>
    </>
  );
}
