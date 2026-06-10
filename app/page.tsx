import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { ServicesGrid } from "@/components/sections/services-grid";
import { ClientsMarquee } from "@/components/sections/clients-marquee";
import { Certifications } from "@/components/sections/certifications";
import { FleetShowcase } from "@/components/sections/fleet-showcase";
import { TeamSection } from "@/components/sections/team-section";
import { BlogPreview } from "@/components/sections/blog-preview";
import { CTASection } from "@/components/sections/cta-section";
import { certifications } from "@/data/site-data";

export default function HomePage() {
  return (
    <>
      <Hero
        badge="Industrial Excellence"
        headline="Professional"
        highlightedText="Sewerage & Structural Solutions"
        description="Precision engineering and industrial maintenance for critical infrastructure. Delivering 24/7 emergency response and certified structural support."
        primaryCta={{ label: "Call Now", href: "/contact" }}
        secondaryCta={{ label: "Get a Free Quote", href: "/contact" }}
        backgroundImages={[
          "/images/hero/hero_01.png",
          "/images/hero/hero_02.png",
          "/images/hero/hero_03.png",
        ]}
      />
      <TrustBar />
      <ServicesGrid />
      <ClientsMarquee />
      <Certifications certs={certifications} />
      <FleetShowcase />
      <TeamSection />
      <BlogPreview />
      <CTASection />
    </>
  );
}
