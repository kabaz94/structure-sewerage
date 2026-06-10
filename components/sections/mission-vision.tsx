import { Building2, Rocket } from "lucide-react";
import { FadeUp } from "@/components/shared/fade-up";

export function MissionVision() {
  return (
    <section className="py-24 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          {/* Mission */}
          <FadeUp className="md:col-span-7">
            <div className="bg-surface-container-lowest p-10 lg:p-12 rounded-xl flex flex-col justify-between ambient-shadow h-full">
              <div>
                <div className="mb-8 text-primary">
                  <Building2 className="w-12 h-12" />
                </div>
                <h3 className="font-headline text-4xl font-black text-primary mb-6">
                  Our Mission
                </h3>
                <p className="text-on-surface-variant text-xl leading-relaxed">
                  To provide unwavering structural stability through innovative
                  engineering and relentless precision. We commit to securing
                  the foundations of modern industry, ensuring that every
                  project meets the highest benchmarks of safety, durability,
                  and technical excellence.
                </p>
              </div>
              <div className="mt-12 flex gap-4">
                <div className="h-1 w-24 bg-primary" />
                <div className="h-1 w-12 bg-tertiary-fixed" />
              </div>
            </div>
          </FadeUp>

          {/* Vision */}
          <FadeUp className="md:col-span-5" delay={0.15}>
            <div className="bg-primary p-10 lg:p-12 rounded-xl text-white flex flex-col justify-between shadow-2xl h-full">
              <div>
                <div className="mb-8 text-tertiary-fixed">
                  <Rocket className="w-12 h-12" />
                </div>
                <h3 className="font-headline text-4xl font-black mb-6">
                  Our Vision
                </h3>
                <p className="text-white/80 text-xl leading-relaxed">
                  To define the global standard as the ultimate structural
                  authority, scaling our expertise to meet the world&apos;s
                  growing infrastructure demands with zero-failure engineering.
                </p>
              </div>
              <div className="mt-12">
                <div className="text-tertiary-fixed font-headline font-bold text-sm tracking-widest uppercase">
                  Scalable Authority
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
