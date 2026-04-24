export function Button({
  children,
  variant,
  onClick,
  title,
  className,
}: {
  children?: React.ReactNode;
  variant?: "primary" | "default";
  onClick?: () => void;
  title?: string;
  className?: string;
}) {
  return (
    <button
      className={`text-base hover:cursor-pointer hover:opacity-80 active:opacity-70 px-2 rounded-lg ${className}
      ${!variant ? "py-2" : "pt-1.75 pb-2.25"}
      ${
        variant === "primary"
          ? "bg-foreground text-background"
          : variant === "default"
            ? "bg-surface text-foreground"
            : ""
      }`}
      onClick={onClick}
    >
      {children}
      {title}
    </button>
  );
}
