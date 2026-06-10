import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";
import { FadeUp } from "@/components/shared/fade-up";

interface CertItem {
  name: string;
  standard: string;
  icon: string;
  image?: string;
}

interface CertificationsProps {
  certs: CertItem[];
  title?: string;
  description?: string;
}

function getIcon(iconName: string) {
  const Icon = (Icons as Record<string, any>)[iconName];
  return Icon || Icons.ShieldCheck;
}

export function Certifications({
  certs,
  title = "Our Certifications",
  description = "We adhere to the highest international standards for quality, safety, and environmental impact.",
}: CertificationsProps) {
  return (
    <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-center gap-12">
        <FadeUp className="md:w-1/3">
          <h2 className="text-4xl font-black font-headline tracking-tighter text-primary mb-4 leading-tight">
            {title}
          </h2>
          <p className="text-on-surface-variant text-lg mb-6">
            {description}
          </p>
          <div className="w-24 h-2 bg-tertiary-fixed" />
        </FadeUp>

        <FadeUp className="md:w-2/3" delay={0.2}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {certs.map((cert) => {
              const Icon = getIcon(cert.icon);
              return (
                <div
                  key={cert.name}
                  className="p-6 bg-white border border-outline-variant/10 rounded-2xl text-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="font-bold text-sm text-primary mb-1 uppercase tracking-tight leading-none">
                    {cert.name}
                  </h4>
                  <p className="text-[10px] text-on-surface-variant font-medium uppercase tracking-widest">
                    {cert.standard}
                  </p>
                </div>
              );
            })}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
