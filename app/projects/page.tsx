import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/sections/hero";
import { ProjectsList } from "@/components/sections/projects-list";
import { CTASection } from "@/components/sections/cta-section";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects Portfolio",
  description:
    "A comprehensive showcase of structural integrity, sewerage maintenance, and civil engineering excellence across Malaysia's leading commercial and educational sectors.",
};

export default function ProjectsPage() {
  return (
    <>
      <Hero
        badge="Project Portfolio"
        headline="Industrial Precision"
        highlightedText="In Action"
        description="A comprehensive showcase of structural integrity, sewerage maintenance, and civil engineering excellence across Malaysia's leading commercial and educational sectors."
        primaryCta={{ label: "Request a Project Audit", href: "/contact" }}
        // secondaryCta={{ label: "View Service Rates", href: "/services" }}
        size="medium"
      />

      <ProjectsList projects={projects} />

      {/* CTA */}
      <section className="bg-surface-container-high py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black font-headline text-primary mb-6 tracking-tight">
            Need Structural Authority?
          </h2>
          <p className="text-lg text-on-surface-variant mb-10 leading-relaxed">
            From routine maintenance to major structural overhauls, our team
            provides the precision engineering your infrastructure deserves.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-primary text-on-primary px-8 py-4 rounded-lg font-bold hover:opacity-90 transition-opacity"
            >
              Request a Project Audit
            </Link>
            <Link
              href="/services"
              className="bg-white border border-outline-variant text-primary px-8 py-4 rounded-lg font-bold hover:bg-surface transition-colors"
            >
              View Service Rates
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
