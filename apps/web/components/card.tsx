type BaseCardProps = React.PropsWithChildren<
  React.HTMLAttributes<HTMLDivElement>
>;

export function BaseCard({ children, className, ...props }: BaseCardProps) {
  return (
    <div
      className={`bg-background-elevated-light dark:bg-background-elevated-dark rounded shadow-lg ${className}`}
      {...props}
    >
      <div className="px-4 py-6">{children}</div>
    </div>
  );
}
