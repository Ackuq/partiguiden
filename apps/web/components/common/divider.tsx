import { twMerge } from "tailwind-merge";

interface DividerProps {
  className?: string;
}

export const Divider = ({ className = "" }: DividerProps) => {
  return (
    <hr
      className={twMerge("border-slate-400 dark:border-slate-600", className)}
    />
  );
};
