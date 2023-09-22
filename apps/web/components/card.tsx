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
      className={`dark:bg-background-elevated-dark rounded bg-white shadow-md ${className}`}
      {...props}
    >
      <div className="px-4 py-6">{children}</div>
    </div>
  );
}
