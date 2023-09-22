type BaseButtonProps = React.PropsWithChildren<
  React.ButtonHTMLAttributes<HTMLButtonElement>
>;

export function BaseButton({
  children,
  className = "",
  ...props
}: BaseButtonProps) {
  return (
    <button className={`hover:opacity-75 ${className}`} {...props}>
      {children}
    </button>
  );
}
