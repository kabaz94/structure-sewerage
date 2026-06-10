import { Clock, Shield, Wrench } from "lucide-react";
import { FadeUp } from "@/components/shared/fade-up";

const trustItems = [
  {
    icon: Clock,
    title: "12/7 Emergency Response",
    description: "Rapid deployment anytime, anywhere.",
  },
  {
    icon: Shield,
    title: "Certified Professionals",
    description: "Fully accredited engineering team.",
  },
  {
    icon: Wrench,
    title: "Precision Equipment",
    description: "Advanced heavy-duty machinery.",
  },
];

export function TrustBar() {
  return (
    <section className="bg-surface-container-low border-y border-outline-variant/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {trustItems.map((item) => (
              <div key={item.title} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-sm shrink-0">
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-lg leading-tight text-primary">
                    {item.title}
                  </p>
                  <p className="text-sm text-on-surface-variant mt-0.5">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
