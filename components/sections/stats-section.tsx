import { SectionHeading } from "@/components/shared/section-heading";
import { StatCard } from "@/components/shared/stat-card";
import { FadeUp } from "@/components/shared/fade-up";
import { Stat } from "@/types";

interface StatsSectionProps {
  stats: Stat[];
  title?: string;
  subtitle?: string;
}

export function StatsSection({
  stats,
  title = "Authority in Numbers",
  subtitle,
}: StatsSectionProps) {
  return (
    <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading title={title} subtitle={subtitle} />

      <FadeUp>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              stat={stat}
              highlight={index === 1}
            />
          ))}
        </div>
      </FadeUp>
    </section>
  );
}
