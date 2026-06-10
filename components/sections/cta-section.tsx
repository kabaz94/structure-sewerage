import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
import { FadeUp } from "@/components/shared/fade-up";
import { cn } from "@/lib/utils";
import { COMPANY_PHONE } from "@/lib/constants";

interface CTASectionProps {
  variant?: "light" | "dark" | "green";
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export function CTASection({
  variant = "light",
  title = "Ready to secure your infrastructure?",
  description = "Contact our emergency dispatch team or request a technical survey for your next project. We respond to all inquiries within 60 minutes.",
  primaryLabel = "Call Now",
  primaryHref = `/tel:${COMPANY_PHONE}`,
  secondaryLabel = "Get a Free Quote",
  secondaryHref = "/contact",
}: CTASectionProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden",
        variant === "light" && "bg-white",
        variant === "dark" && "bg-primary-container",
        variant === "green" && "bg-surface-container-high"
      )}
    >
      {/* Decorative element */}
      {variant === "light" && (
        <div className="absolute top-0 right-0 w-1/3 h-full bg-surface-container-low -skew-x-12 translate-x-1/2" />
      )}

      <div className={cn("py-24 px-6 lg:px-8 max-w-7xl mx-auto relative z-10")}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-16">
          <FadeUp className="md:w-1/2">
            <h2 className="text-5xl font-black font-headline tracking-tighter text-primary mb-6">
              {title}
            </h2>
            <p className="text-lg text-on-surface-variant mb-10 leading-relaxed">
              {description}
            </p>
            {/* <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={primaryHref}
                className="bg-primary text-on-primary px-10 py-5 rounded-xl font-headline font-bold hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
              >
                <Phone className="w-5 h-5" />
                {primaryLabel}
              </Link>
              <Link
                href={secondaryHref}
                className="bg-white/10 backdrop-blur-md border-2 border-primary text-primary px-10 py-5 rounded-xl font-headline font-bold hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2 group"
              >
                {secondaryLabel}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div> */}
          </FadeUp>

          <FadeUp className="md:w-1/2" delay={0.2}>
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-6 p-6 rounded-2xl bg-surface-container-low">
                <div className="w-14 h-14 bg-primary text-white rounded-xl flex items-center justify-center shrink-0">
                  <Phone className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-sm font-bold text-outline uppercase tracking-widest font-label">
                    Immediate Dispatch
                  </p>
                  <p className="text-2xl font-black text-primary font-headline">
                    {COMPANY_PHONE}
                  </p>
                </div>
              </div>
              <Link
                href="https://wa.me/60162856266"
                className="flex items-center gap-6 p-6 rounded-2xl bg-[#25D366]/10 hover:bg-[#25D366]/20 transition-colors group"
              >
                <div className="w-14 h-14 bg-[#25D366] text-white rounded-xl flex items-center justify-center shrink-0">
                  <svg
                    className="w-8 h-8 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-outline uppercase tracking-widest font-label">
                    WhatsApp Support
                  </p>
                  <p className="text-2xl font-black text-[#25D366] group-hover:underline transition-all font-headline">
                    Chat with an Expert
                  </p>
                </div>
              </Link>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
