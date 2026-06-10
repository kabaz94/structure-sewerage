import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { footerColumns } from "@/data/navigation";
import {
  COMPANY_NAME,
  COMPANY_DESCRIPTION,
  COMPANY_PHONE,
  COMPANY_EMAIL,
  COMPANY_ADDRESS,
} from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-outline-variant/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <img
                src="/images/logorm.png"
                alt="Structure Sewerage"
                className="h-12 w-auto"
              />
              {/* <span className="text-xl font-bold text-primary font-headline">
                {COMPANY_NAME}
              </span> */}
            </Link>
            <p className="text-on-surface-variant text-sm leading-relaxed mb-6 max-w-sm">
              {COMPANY_DESCRIPTION}
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm text-on-surface-variant">
                <MapPin className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                <span>
                  {COMPANY_ADDRESS.street}, {COMPANY_ADDRESS.city},{" "}
                  {COMPANY_ADDRESS.postcode}, {COMPANY_ADDRESS.country}
                </span>
              </div>
              <Link
                href={`tel:${COMPANY_PHONE}`}
                className="flex items-center gap-3 text-sm text-on-surface-variant hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4 shrink-0" />
                <span>{COMPANY_PHONE}</span>
              </Link>
              <Link
                href={`mailto:${COMPANY_EMAIL}`}
                className="flex items-center gap-3 text-sm text-on-surface-variant hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4 shrink-0" />
                <span>{COMPANY_EMAIL}</span>
              </Link>
            </div>
          </div>

          {/* Link Columns */}
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h4 className="font-bold text-primary mb-6 font-headline uppercase text-xs tracking-widest">
                {column.title}
              </h4>
              <ul className="space-y-4">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-outline-variant/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-on-surface-variant text-xs font-label tracking-wide">
            &copy; {new Date().getFullYear()} {COMPANY_NAME}. Precision
            Engineering &amp; Industrial Maintenance. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="#"
              className="text-on-surface-variant hover:text-primary transition-colors text-xs uppercase tracking-widest"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-on-surface-variant hover:text-primary transition-colors text-xs uppercase tracking-widest"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
