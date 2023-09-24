type ExternalLinkProps = React.PropsWithChildren<{
  href: string;
}>;

export default function ExternalLink({ href, children }: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary"
    >
      {children}
    </a>
  );
}
