import { twMerge } from "tailwind-merge";

interface Props {
  className?: string;
}

export default function LoadingCard({ className }: Props) {
  return (
    <div
      className={twMerge(
        "h-10 animate-pulse bg-slate-200 dark:bg-slate-900",
        className,
      )}
    />
  );
}
