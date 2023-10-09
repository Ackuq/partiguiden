import { twMerge } from "tailwind-merge";

export const Divider = ({
  className = "",
  ...rest
}: React.HTMLAttributes<HTMLHRElement>) => {
  return (
    <hr
      className={twMerge("border-slate-400 dark:border-slate-600", className)}
      {...rest}
    />
  );
};
