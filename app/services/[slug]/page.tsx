import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { services } from "@/data/services";
import { Badge } from "@/components/shared/badge";
import { FadeUp } from "@/components/shared/fade-up";

interface ServiceDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return { title: "Service Not Found" };

  return {
    title: service.title,
    description: service.description,
  };
}

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const categoryLabels: Record<string, string> = {
    sewerage: "Sewerage Services",
    civil: "Civil & Structural Works",
    hygiene: "Hygiene Services",
    emergency: "Emergency Response",
    machinery: "Equipment & Machinery",
  };

  return (
    <>
      {/* Hero Banner */}
      <section className="relative bg-primary py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <FadeUp>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-primary-fixed-dim hover:text-white transition-colors mb-8 text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Services
            </Link>
          </FadeUp>
          <FadeUp delay={0.1}>
            <Badge className="mb-6">
              {categoryLabels[service.category] || service.category}
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black font-headline tracking-tighter text-white leading-tight mb-6">
              {service.title}
            </h1>
            <p className="text-xl text-primary-fixed-dim max-w-3xl leading-relaxed">
              {service.longDescription || service.description}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <FadeUp>
            <h2 className="text-3xl font-bold font-headline text-primary mb-8">
              What We Offer
            </h2>
            <ul className="space-y-4">
              {service.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-4 p-5 bg-surface-container-low rounded-xl"
                >
                  <CheckCircle2 className="w-5 h-5 text-tertiary-container shrink-0" />
                  <span className="text-on-surface font-medium">{feature}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <Link
                href="/contact"
                className="bg-primary text-on-primary px-8 py-4 rounded-lg font-headline font-bold text-sm hover:opacity-90 transition-all inline-flex items-center gap-3 group"
              >
                Inquire Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeUp>

          <FadeUp delay={0.15}>
            <div className="bg-surface-container-low p-10 rounded-3xl">
              <h3 className="text-xl font-bold font-headline text-primary mb-6">
                Related Services
              </h3>
              <div className="space-y-4">
                {services
                  .filter(
                    (s) =>
                      s.category === service.category && s.slug !== service.slug
                  )
                  .slice(0, 4)
                  .map((related) => (
                    <Link
                      key={related.slug}
                      href={`/services/${related.slug}`}
                      className="block p-4 bg-surface-container-lowest rounded-xl hover:shadow-md transition-all group"
                    >
                      <h4 className="font-bold text-primary group-hover:text-primary-container transition-colors">
                        {related.title}
                      </h4>
                      <p className="text-sm text-on-surface-variant mt-1">
                        {related.description}
                      </p>
                    </Link>
                  ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
