export function Button({
  children,
  variant,
  onClick,
  title,
  className,
  disabled,
}: {
  children?: React.ReactNode;
  variant?: "primary" | "default";
  onClick?: () => void;
  title?: string;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <button
      className={`
        text-base px-2 rounded-lg 
        transition-all duration-150
        ${!variant ? "py-2" : "pt-1.75 pb-2.25"}
        ${!disabled ? "hover:cursor-pointer hover:opacity-80 active:opacity-70" : ""}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${
          variant === "primary"
            ? "bg-foreground text-background"
            : variant === "default"
              ? "bg-surface text-foreground"
              : ""
        }
        ${className}
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
      {title}
    </button>
  );
}
