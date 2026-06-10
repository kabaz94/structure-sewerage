import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "green" | "blue" | "dark";
}

export function Badge({
  children,
  className,
  variant = "green",
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-block text-xs font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full",
        variant === "green" &&
          "bg-tertiary-fixed text-on-tertiary-fixed",
        variant === "blue" &&
          "bg-primary-fixed-dim/20 text-primary-fixed-dim",
        variant === "dark" &&
          "bg-primary-container text-on-primary-container",
        className
      )}
    >
      {children}
    </span>
  );
}
