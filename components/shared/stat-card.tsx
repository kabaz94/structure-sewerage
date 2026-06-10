import { cn } from "@/lib/utils";
import { AnimatedCounter } from "./animated-counter";
import { Stat } from "@/types";

interface StatCardProps {
  stat: Stat;
  className?: string;
  highlight?: boolean;
}

export function StatCard({ stat, className, highlight }: StatCardProps) {
  return (
    <div
      className={cn(
        "p-8 bg-surface-container-high rounded-xl text-center",
        highlight && "border-b-4 border-tertiary-fixed",
        className
      )}
    >
      <AnimatedCounter
        value={stat.value}
        suffix={stat.suffix}
        prefix={stat.prefix}
        isDecimal={stat.isDecimal}
        className="text-5xl font-black text-primary font-headline mb-2"
      />
      <div className="text-sm uppercase tracking-widest text-on-surface-variant font-bold font-label">
        {stat.label}
      </div>
    </div>
  );
}
