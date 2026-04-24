export function Input({
  type = "text",
  className = "",
  value,
  onChange,
  placeholder,
  ...props
}: {
  type?: React.HTMLInputTypeAttribute;
  className?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`p-2 border border-border bg-surface rounded-lg w-full focus:outline-none ${className}`}
      {...props}
    />
  );
}
