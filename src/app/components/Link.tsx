export function Link({
  href,
  title,
  className,
}: {
  href?: string;
  title: string;
  className?: string;
}) {
  return (
    <a className={`text-base text-grayText ${className}`} href={href}>
      {title}
    </a>
  );
}
