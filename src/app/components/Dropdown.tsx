import { images } from "@/src/assets";

export function Dropdown({
  options = [],
  value,
  onChange,
  placeholder = "Выберите...",
  className = "",
}: {
  options?: { label: string; value: string | number }[];
  value?: string | number;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className="relative">
      <select
        className={`p-2 border border-border bg-surface rounded-lg focus:outline-none appearance-none ${className}`}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
        <img src={images.icons.select} alt="" className="w-4 h-4" />
      </div>
    </div>
  );
}
