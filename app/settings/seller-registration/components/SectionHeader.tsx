"use client";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeader({
  title,
  subtitle,
}: SectionHeaderProps) {
  return (
    <div className="mb-8">

      <h2 className="text-3xl font-bold text-white">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-2 text-gray-400 leading-relaxed">
          {subtitle}
        </p>
      )}

    </div>
  );
}