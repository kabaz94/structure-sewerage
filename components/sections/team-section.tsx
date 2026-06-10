import Image from "next/image";
import { Badge } from "@/components/shared/badge";
import { FadeUp } from "@/components/shared/fade-up";

export function TeamSection() {
  return (
    <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row items-center gap-16">
        <FadeUp className="lg:w-1/2 order-2 lg:order-1">
          <div className="relative">
            <div className="absolute -inset-4 bg-tertiary-fixed/20 rounded-3xl -z-10" />
            <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/Team.png"
                alt="Our professional engineering and maintenance team"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </FadeUp>

        <FadeUp className="lg:w-1/2 order-1 lg:order-2" delay={0.2}>
          <Badge className="mb-6">Human-Centric Engineering</Badge>
          <h2 className="text-4xl md:text-5xl font-black font-headline tracking-tighter text-primary mb-6 leading-tight">
            Meet Our Expert Team
          </h2>
          <p className="text-on-surface-variant text-lg leading-relaxed mb-8">
            Behind every successful project is our team of dedicated, certified
            professionals. With decades of combined experience in complex
            structural engineering and high-precision sewerage maintenance, we
            bring unmatched expertise to every site. Our commitment to safety,
            efficiency, and industrial excellence ensures your infrastructure
            is in the most capable hands.
          </p>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-3xl font-black text-primary">100%</p>
              <p className="text-xs uppercase font-bold tracking-widest text-outline">
                Certified Staff
              </p>
            </div>
            <div>
              <p className="text-3xl font-black text-primary">25+</p>
              <p className="text-xs uppercase font-bold tracking-widest text-outline">
                Years Avg Exp.
              </p>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
