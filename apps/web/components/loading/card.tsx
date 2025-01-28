import { twMerge } from "tailwind-merge";

interface Props {
  className?: string;
}

export default function LoadingCard({ className }: Props) {
  return (
    <div
      className={twMerge(
        "h-28 animate-pulse rounded-sm bg-slate-200 dark:bg-slate-800",
        className,
      )}
    />
  );
}
