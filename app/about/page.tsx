import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { MissionVision } from "@/components/sections/mission-vision";
import { StatsSection } from "@/components/sections/stats-section";
import { CTASection } from "@/components/sections/cta-section";
import { FadeUp } from "@/components/shared/fade-up";
import { stats } from "@/data/site-data";
import { COMPANY_FOUNDED_YEAR } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Founded in 1994, Structure Sewerage has evolved into a leading provider of sewerage and structural engineering solutions across Malaysia.",
};

export default function AboutPage() {
  const currentYear = new Date().getFullYear();
  const yearsOfExperience = currentYear - COMPANY_FOUNDED_YEAR;

  return (
    <>
      <Hero
        badge={`Established ${COMPANY_FOUNDED_YEAR}`}
        headline="Industrial"
        highlightedText="Structural Authority"
        description="Engineered for endurance. Built for the most critical infrastructure challenges."
        primaryCta={{ label: "Request a Quote", href: "/contact" }}
        secondaryCta={{ label: "View Our Projects", href: "/projects" }}
        size="medium"
      />

      {/* Company Background */}
      <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <FadeUp className="lg:w-1/2">
            <h2 className="font-headline text-4xl md:text-5xl font-black text-primary tracking-tight mb-8">
              {yearsOfExperience}+ Years of
              <br />
              Technical Precision
            </h2>
            <div className="space-y-6 text-on-surface-variant leading-relaxed text-lg">
              <p>
                Founded on the principles of structural integrity and
                environmental responsibility, Structure Sewerage has evolved
                into a trusted leader in critical sewerage and structural
                systems across Malaysia.
              </p>
              <p>
                Our journey began in {COMPANY_FOUNDED_YEAR}, addressing the
                complex wastewater challenges of emerging industrial zones.
                Today, we manage extensive critical infrastructure across the
                Klang Valley and beyond, utilizing proprietary diagnostic
                technology that predicts structural fatigue before it becomes a
                failure.
              </p>
              <p>
                We don&apos;t just maintain; we optimize. Our team of certified
                engineers and master technicians brings a rigorous, data-driven
                approach to every project, ensuring that our clients&apos;
                assets are protected for the next generation.
              </p>
            </div>
          </FadeUp>

          <FadeUp className="lg:w-1/2 w-full grid grid-cols-2 gap-4" delay={0.15}>
            <div className="bg-surface-container-high rounded-xl overflow-hidden aspect-[4/5] relative group">
              <img
                src="/images/history.png"
                alt="The Beginning"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-primary/40" />
              <div className="absolute bottom-4 left-4 text-white font-headline font-bold text-sm">
                The Beginning
              </div>
            </div>
            <div className="bg-surface-container-high rounded-xl overflow-hidden aspect-[4/5] mt-12 relative group">
              <img
                src="/images/modern.png"
                alt="The Future"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-primary/40" />
              <div className="absolute bottom-4 left-4 text-white font-headline font-bold text-sm">
                The Future
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <MissionVision />
      <StatsSection
        stats={[
          { value: 350, suffix: "+", label: "Certified Professionals" },
          { value: 12, suffix: "M+", label: "Linear Feet Managed" },
          { value: 99.9, suffix: "%", label: "Structural Uptime", isDecimal: true },
          { value: 4, prefix: "$", suffix: "B", label: "Assets Protected" },
        ]}
        title="Authority in Numbers"
      />
      <CTASection variant="dark" />
    </>
  );
}
