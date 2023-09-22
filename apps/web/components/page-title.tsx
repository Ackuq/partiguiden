type PageTitleProps = React.PropsWithChildren<{
  Icon?: React.ElementType;
}>;

export default function PageTitle({ children, Icon }: PageTitleProps) {
  return (
    <div className="bg-primary dark:bg-background-elevated-dark py-4 text-center text-white">
      {Icon && <Icon className="mx-auto mb-4 h-10 w-10" />}
      <h1 className="text-3xl">{children}</h1>
    </div>
  );
}
