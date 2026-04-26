export function Input({
  type = "text",
  className = "",
  value,
  onChange,
  placeholder,
  defaultValue,
  disabled,
  required,
  ...props
}: {
  type?: React.HTMLInputTypeAttribute;
  className?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  defaultValue?: string;
  disabled?: boolean;
  required?: boolean;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      defaultValue={defaultValue}
      disabled={disabled}
      required={required}
      className={`p-2 border border-border bg-surface rounded-lg w-full focus:outline-none ${className}`}
      {...props}
    />
  );
}
