import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { ServicesGrid } from "@/components/sections/services-grid";
import { EmergencyCard } from "@/components/sections/emergency-card";
import { MachineryFleet } from "@/components/sections/machinery-fleet";
import { CTASection } from "@/components/sections/cta-section";
import { FadeUp } from "@/components/shared/fade-up";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Comprehensive sewerage, structural, and infrastructure maintenance services for commercial, industrial, and residential clients across Malaysia.",
};

export default function ServicesPage() {
  return (
    <>
      <Hero
        badge="Structural Authority"
        headline="Precision Engineering"
        highlightedText="Services"
        description="Integrated solutions for complex industrial infrastructure, sewerage systems, and structural maintenance."
        primaryCta={{ label: "Request a Free Quote", href: "/contact" }}
        secondaryCta={{ label: "Contact Sales", href: "/contact" }}
        size="medium"
      />

      <ServicesGrid />

      {/* Emergency + Machinery */}
      <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FadeUp>
            <EmergencyCard />
          </FadeUp>
          <FadeUp delay={0.15}>
            <MachineryFleet />
          </FadeUp>
        </div>
      </section>

      <CTASection variant="green" />
    </>
  );
}
