interface Props {
  title: string;
  subtitle?: string;
  centered?: boolean;
  badge?: string;
}

export default function SectionHeading({ title, subtitle, centered, badge }: Props) {
  return (
    <div className={centered ? "text-center" : ""}>
      {badge && (
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-gray-600">
          <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
          {badge}
        </div>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-lg text-gray-500 ${centered ? "mx-auto max-w-2xl" : "max-w-2xl"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
