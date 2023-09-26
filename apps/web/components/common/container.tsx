import { twMerge } from "tailwind-merge";

type ContainerProps = React.HTMLAttributes<HTMLDivElement>;

export default function Container({
  children,
  className,
  ...rest
}: ContainerProps) {
  return (
    <div className={twMerge("container mb-4", className)} {...rest}>
      {children}
    </div>
  );
}
