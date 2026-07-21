"use client";

import { Upload, X, FileText } from "lucide-react";

interface UploadBoxProps {
  label: string;
  file: File | null;
  required?: boolean;
  accept?: string;
  error?: string;
  onChange: (file: File | null) => void;
}

export default function UploadBox({
  label,
  file,
  required = false,
  accept = ".pdf,.jpg,.jpeg,.png",
  error,
  onChange,
}: UploadBoxProps) {
  function handleFileChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const selected = e.target.files?.[0] || null;
    onChange(selected);
  }

  return (
    <div className="space-y-2">

      <label className="block text-sm font-medium text-gray-200">
        {label}

        {required && (
          <span className="text-red-500 ml-1">*</span>
        )}
      </label>

      <div
        className={`
          border-2
          border-dashed
          rounded-2xl
          p-6
          transition

          ${
            error
              ? "border-red-500"
              : "border-zinc-700 hover:border-yellow-400"
          }
        `}
      >
        {file ? (
          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">

              <FileText
                className="text-yellow-400"
                size={22}
              />

              <div>
                <p className="text-white text-sm font-medium">
                  {file.name}
                </p>

                <p className="text-gray-500 text-xs">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>

            </div>

            <button
              type="button"
              onClick={() => onChange(null)}
              className="text-red-500 hover:text-red-400"
            >
              <X size={20} />
            </button>

          </div>
        ) : (
          <label className="cursor-pointer flex flex-col items-center">

            <Upload
              className="text-yellow-400"
              size={40}
            />

            <p className="mt-3 text-white">
              Click to upload
            </p>

            <p className="text-gray-500 text-sm mt-1">
              PDF, JPG or PNG
            </p>

            <input
              hidden
              type="file"
              accept={accept}
              onChange={handleFileChange}
            />

          </label>
        )}
      </div>

      {error && (
        <p className="text-red-500 text-sm">
          {error}
        </p>
      )}

    </div>
  );
}