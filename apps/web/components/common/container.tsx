type ContainerProps = React.HTMLAttributes<HTMLDivElement>;

export default function Container({
  children,
  className,
  ...rest
}: ContainerProps) {
  return (
    <div className={`container mb-4 ${className}`} {...rest}>
      {children}
    </div>
  );
}
