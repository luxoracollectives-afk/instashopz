"use client";

interface FormTextareaProps {
  label: string;
  name: string;
  value: string;
  placeholder?: string;
  rows?: number;
  required?: boolean;
  disabled?: boolean;
  maxLength?: number;
  error?: string;
  onChange: (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
}

export default function FormTextarea({
  label,
  name,
  value,
  placeholder,
  rows = 5,
  required = false,
  disabled = false,
  maxLength,
  error,
  onChange,
}: FormTextareaProps) {
  return (
    <div className="space-y-2">

      <div className="flex justify-between items-center">

        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-200"
        >
          {label}

          {required && (
            <span className="ml-1 text-red-500">*</span>
          )}
        </label>

        {maxLength && (
          <span className="text-xs text-gray-500">
            {value.length}/{maxLength}
          </span>
        )}

      </div>

      <textarea
        id={name}
        name={name}
        rows={rows}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        onChange={onChange}
        className={`
          w-full
          rounded-2xl
          border
          bg-zinc-900
          px-4
          py-3
          text-white
          placeholder:text-gray-500
          resize-none
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
      />

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}

    </div>
  );
}