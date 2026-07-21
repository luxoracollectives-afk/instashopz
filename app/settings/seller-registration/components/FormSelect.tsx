"use client";

interface Option {
  label: string;
  value: string;
}

interface FormSelectProps {
  label: string;
  name: string;
  value: string;
  options: Option[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function FormSelect({
  label,
  name,
  value,
  options,
  placeholder = "Select an option",
  required = false,
  disabled = false,
  error,
  onChange,
}: FormSelectProps) {
  return (
    <div className="space-y-2">

      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-200"
      >
        {label}

        {required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </label>

      <select
        id={name}
        name={name}
        value={value}
        disabled={disabled}
        onChange={onChange}
        className={`
          w-full
          rounded-2xl
          border
          bg-zinc-900
          px-4
          py-3
          text-white
          outline-none
          transition-all
          duration-200

          ${
            error
              ? "border-red-500 focus:border-red-500"
              : "border-zinc-700 focus:border-yellow-400"
          }

          ${
            disabled
              ? "opacity-60 cursor-not-allowed"
              : ""
          }
        `}
      >
        <option value="">
          {placeholder}
        </option>

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}

    </div>
  );
}