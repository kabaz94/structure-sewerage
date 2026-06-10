import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
  accentColor?: string;
}

export function SectionHeading({
  title,
  subtitle,
  centered = true,
  className,
  accentColor = "bg-tertiary-fixed",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-16",
        centered && "text-center",
        className
      )}
    >
      <h2 className="text-4xl md:text-5xl font-black font-headline tracking-tighter text-primary mb-4 leading-tight">
        {title}
      </h2>
      <div
        className={cn(
          "h-2 w-24",
          accentColor,
          centered && "mx-auto"
        )}
      />
      {subtitle && (
        <p className="mt-6 text-lg text-on-surface-variant max-w-2xl mx-auto font-body leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
