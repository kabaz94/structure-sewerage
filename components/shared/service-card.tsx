import Link from "next/link";
import { cn } from "@/lib/utils";
import * as Icons from "lucide-react";
import { Service } from "@/types";

interface ServiceCardProps {
  service: Service;
  className?: string;
}

function getIcon(iconName: string) {
  const Icon = (Icons as Record<string, any>)[iconName];
  return Icon || Icons.Wrench;
}

export function ServiceCard({ service, className }: ServiceCardProps) {
  const Icon = getIcon(service.icon);

  if (service.featured) {
    return (
      <div
        className={cn(
          "bg-primary text-white p-8 rounded-3xl flex flex-col group card-hover",
          className
        )}
      >
        <Icon className="w-12 h-12 text-tertiary-fixed mb-6" />
        <h3 className="text-2xl font-bold font-headline mb-4">
          {service.title}
        </h3>
        <p className="text-primary-fixed-dim mb-6 text-sm leading-relaxed">
          {service.description}
        </p>
        <ul className="space-y-3 mt-auto text-on-primary-container text-sm font-medium">
          {service.features.slice(0, 3).map((feature) => (
            <li key={feature} className="flex items-center gap-2">
              <Icons.CheckCircle2 className="w-4 h-4 text-tertiary-fixed shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
        <Link
          href={`/services/${service.slug}`}
          className="mt-6 self-start text-tertiary-fixed font-bold text-sm flex items-center gap-2 group-hover:gap-4 transition-all"
        >
          Details <Icons.ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/10 flex flex-col group card-hover",
        className
      )}
    >
      <Icon className="w-12 h-12 text-primary mb-6" />
      <h3 className="text-2xl font-bold font-headline mb-4 text-primary">
        {service.title}
      </h3>
      <p className="text-on-surface-variant mb-6 text-sm leading-relaxed">
        {service.description}
      </p>
      <ul className="space-y-3 text-on-surface-variant text-sm font-medium mt-auto">
        {service.features.slice(0, 2).map((feature) => (
          <li key={feature} className="flex items-center gap-2">
            <Icons.CheckCircle2 className="w-4 h-4 text-tertiary-container shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
      <Link
        href={`/services/${service.slug}`}
        className="mt-6 self-start text-primary font-bold text-sm flex items-center gap-2 border-b-2 border-primary pb-1 group-hover:gap-4 transition-all"
      >
        Details <Icons.ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
