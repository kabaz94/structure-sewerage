import { cn } from "@/lib/utils";
import * as Icons from "lucide-react";
import { ReactNode } from "react";

interface ContactInfoCardProps {
  icon: string;
  title: string;
  children: ReactNode;
  className?: string;
  action?: ReactNode;
}

function getIcon(iconName: string) {
  const Icon = (Icons as Record<string, any>)[iconName];
  return Icon || Icons.Phone;
}

export function ContactInfoCard({
  icon,
  title,
  children,
  className,
  action,
}: ContactInfoCardProps) {
  const Icon = getIcon(icon);

  return (
    <div
      className={cn(
        "flex items-start gap-4 p-6 rounded-2xl bg-surface-container-low",
        className
      )}
    >
      <div className="w-14 h-14 bg-primary text-white rounded-xl flex items-center justify-center shrink-0">
        <Icon className="w-7 h-7" />
      </div>
      <div>
        <p className="text-sm font-bold text-outline uppercase tracking-widest font-label mb-1">
          {title}
        </p>
        <div className="text-on-surface font-medium">{children}</div>
        {action && <div className="mt-2">{action}</div>}
      </div>
    </div>
  );
}
