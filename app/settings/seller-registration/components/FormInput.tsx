"use client";

interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  maxLength?: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormInput({
  label,
  name,
  type = "text",
  value,
  placeholder,
  required = false,
  error,
  disabled = false,
  maxLength,
  onChange,
}: FormInputProps) {
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

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        onChange={onChange}
        className={`
          w-full
          rounded-2xl
          border
          px-4
          py-3
          bg-zinc-900
          text-white
          placeholder:text-gray-500
          transition-all
          duration-200
          outline-none

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
      />

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}

    </div>
  );
}