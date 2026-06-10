import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { FadeUp } from "@/components/shared/fade-up";
import { Testimonial } from "@/types";

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        title="What Our Clients Say"
        subtitle="Trusted by leading organizations across Malaysia for critical infrastructure maintenance and engineering excellence."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <FadeUp key={testimonial.author} delay={index * 0.1}>
            <div className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/10 ambient-shadow h-full flex flex-col">
              <Quote className="w-8 h-8 text-tertiary-fixed-dim mb-4 shrink-0" />
              <p className="text-on-surface-variant leading-relaxed mb-6 flex-1">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div>
                <p className="font-bold text-primary font-headline">
                  {testimonial.author}
                </p>
                <p className="text-sm text-on-surface-variant">
                  {testimonial.role}, {testimonial.company}
                </p>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
