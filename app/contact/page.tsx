import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { ContactForm } from "@/components/sections/contact-form";
import { ContactSidebar } from "@/components/sections/contact-sidebar";
import { FadeUp } from "@/components/shared/fade-up";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Expert structural engineering and industrial maintenance at your service. Contact our team for round-the-clock support.",
};

export default function ContactPage() {
  return (
    <>
      <Hero
        badge="Global Support"
        headline="Contact Us"
        description="Expert structural engineering and industrial maintenance at your service. Our specialized teams provide round-the-clock support for high-stakes infrastructure and industrial systems."
        primaryCta={{ label: "Request a Quote", href: "#contact-form" }}
        size="medium"
      />

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-6 -mt-16 relative z-20 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form */}
          <FadeUp className="lg:col-span-8" id="contact-form">
            <ContactForm />
          </FadeUp>

          {/* Sidebar */}
          <FadeUp className="lg:col-span-4" delay={0.15}>
            <ContactSidebar />
          </FadeUp>
        </div>
      </section>
    </>
  );
}
