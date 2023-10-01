import { committeeInfo, type Committee } from "@lib/committes";
import { committeeBackground } from "@lib/styles/committees";
import { twMerge } from "tailwind-merge";

type CardHeaderProps = React.PropsWithChildren<{
  className?: string;
}>;

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={twMerge("w-full px-4 py-1", className)}>
      <span>{children}</span>
    </div>
  );
}

type CommitteeHeaderProps = {
  committee?: Committee | null;
};

export function CommitteeHeader({ committee }: CommitteeHeaderProps) {
  if (!committee) {
    return;
  }
  const info = committeeInfo[committee];
  return (
    <CardHeader
      className={twMerge("text-font-dark", committeeBackground[committee])}
    >
      {info.desc}
    </CardHeader>
  );
}

type BaseCardProps = React.PropsWithChildren<
  React.HTMLAttributes<HTMLDivElement>
>;

export function Card({ children, className = "", ...props }: BaseCardProps) {
  return (
    <div
      className={twMerge(
        "overflow-hidden rounded bg-white p-4 shadow-md",
        "dark:bg-background-elevated-dark",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
