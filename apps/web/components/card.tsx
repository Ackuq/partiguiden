import { twMerge } from "tailwind-merge";

type BaseCardProps = React.PropsWithChildren<
  React.HTMLAttributes<HTMLDivElement>
>;

export function Card({ children, className = "", ...props }: BaseCardProps) {
  return (
    <div
      className={twMerge(
        "dark:bg-background-elevated-dark rounded bg-white p-4 shadow-md",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
