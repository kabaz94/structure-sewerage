import Image from "next/image";
import { FadeUp } from "@/components/shared/fade-up";

export function FleetShowcase() {
  return (
    <section className="py-12 px-6 lg:px-8 max-w-7xl mx-auto">
      <FadeUp>
        <div className="bg-tertiary-fixed p-1 rounded-3xl overflow-hidden">
          <div className="bg-white p-8 lg:p-10 h-full rounded-[1.4rem] flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1">
              <h3 className="text-3xl font-bold font-headline mb-6 text-primary">
                Specialized Equipment Fleet
              </h3>
              <p className="text-on-surface-variant mb-8 text-lg leading-relaxed">
                Our fleet consists of the latest Euro-6 compliant jetting units
                and heavy-duty structural rigs, ensuring maximum efficiency and
                minimal environmental footprint across all operational sites.
              </p>
              <div className="flex gap-10">
                <div>
                  <p className="text-4xl font-black text-primary">50+</p>
                  <p className="text-[12px] uppercase font-bold tracking-widest text-outline">
                    Service Units
                  </p>
                </div>
                <div className="w-px h-12 bg-outline-variant/30" />
                <div>
                  <p className="text-4xl font-black text-primary">24h</p>
                  <p className="text-[12px] uppercase font-bold tracking-widest text-outline">
                    Average Uptime
                  </p>
                </div>
              </div>
            </div>
            <div className="flex-1 w-full">
              <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/lori.png"
                  alt="Company lorry"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </FadeUp>
    </section>
  );
}
