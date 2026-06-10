import { SectionHeading } from "@/components/shared/section-heading";
import { ServiceCard } from "@/components/shared/service-card";
import { StaggerChildren, StaggerItem } from "@/components/shared/stagger-children";
import { services } from "@/data/services";

export function ServicesGrid() {
  const featuredServices = services.filter((s) => s.featured);
  const regularServices = services.filter((s) => !s.featured).slice(0, 6);

  return (
    <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        title="Core Infrastructure Services"
        subtitle="Comprehensive sewerage and structural maintenance solutions backed by decades of engineering excellence."
      />

      <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Featured service */}
        {featuredServices.map((service) => (
          <StaggerItem key={service.slug}>
            <ServiceCard service={service} />
          </StaggerItem>
        ))}

        {/* Regular services */}
        {regularServices.map((service) => (
          <StaggerItem key={service.slug}>
            <ServiceCard service={service} />
          </StaggerItem>
        ))}
      </StaggerChildren>
    </section>
  );
}
