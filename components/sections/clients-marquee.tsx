import Image from "next/image";
import { SectionHeading } from "@/components/shared/section-heading";
import { clients } from "@/data/site-data";

export function ClientsMarquee() {
  const duplicatedClients = [...clients, ...clients];

  return (
    <section className="py-20 bg-surface-container-low overflow-hidden border-y border-outline-variant/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12 text-center">
        <h2 className="text-2xl font-black font-headline tracking-tighter text-primary uppercase mb-2">
          Our Trusted Clients
        </h2>
        <div className="w-16 h-1 bg-tertiary-fixed/40 mx-auto" />
      </div>

      <div className="relative">
        <div className="flex animate-marquee whitespace-nowrap items-center gap-24">
          {duplicatedClients.map((client, index) => (
            <div
              key={`${client.name}-${index}`}
              className="flex items-center justify-center p-4 w-72 h-40 shrink-0"
            >
              <Image
                src={client.logo}
                alt={`${client.name} logo`}
                width={300}
                height={300}
                /*className="max-h-full max-w-full object-contain grayscale hover:grayscale-0 transition-all duration-300"*/
                 className="max-h-full max-w-full transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
