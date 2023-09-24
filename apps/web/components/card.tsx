type BaseCardProps = React.PropsWithChildren<
  React.HTMLAttributes<HTMLDivElement>
>;

export function BaseCard({
  children,
  className = "",
  ...props
}: BaseCardProps) {
  return (
    <div
      className={`dark:bg-background-elevated-dark rounded bg-white p-4 shadow-md ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
