import { twMerge } from "tailwind-merge";

type PageTitleProps = React.PropsWithChildren<{
  Icon?: React.ElementType;
  className?: string;
}>;

export default function PageTitle({
  children,
  className,
  Icon,
}: PageTitleProps) {
  return (
    <div
      className={twMerge(
        "bg-teal-700 mb-4 py-4 text-center text-white dark:bg-slate-800",
        className,
      )}
    >
      {Icon && <Icon className="mx-auto mb-2 h-10 w-10" />}
      <h1 className="container text-2xl sm:text-3xl">{children}</h1>
    </div>
  );
}
