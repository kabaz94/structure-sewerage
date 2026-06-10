import Link from "next/link";
import { Phone, MessageCircle, MapPin, Mail, Clock } from "lucide-react";
import {
  COMPANY_PHONE,
  COMPANY_EMERGENCY_PHONE,
  COMPANY_EMAIL,
  COMPANY_ADDRESS,
  COMPANY_WHATSAPP,
} from "@/lib/constants";

export function ContactSidebar() {
  return (
    <div className="space-y-8">
      {/* Emergency Card */}
      <div className="bg-surface-container-high rounded-xl p-8 border-l-4 border-tertiary-fixed">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-tertiary-fixed/20 p-3 rounded-full">
            <Phone className="w-5 h-5 text-tertiary-fixed-variant" />
          </div>
          <h3 className="text-xl font-bold font-headline text-primary">
            Immediate Dispatch
          </h3>
        </div>
        <p className="text-on-surface-variant mb-4 leading-relaxed">
          For emergency structural failures or sewerage overflows, call our
          24/7 hotline:
        </p>
        <Link
          href={`tel:${COMPANY_EMERGENCY_PHONE}`}
          className="text-2xl font-black text-primary font-headline hover:text-primary-container transition-colors tracking-tight"
        >
          {COMPANY_EMERGENCY_PHONE}
        </Link>
      </div>

      {/* Direct Contact Methods */}
      <div className="bg-surface-container-lowest rounded-xl p-8 shadow-sm space-y-8">
        <div className="flex items-start gap-4">
          <MessageCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
          <div>
            <h4 className="font-bold text-primary font-headline">
              WhatsApp Support
            </h4>
            <p className="text-on-surface-variant text-sm mb-2">
              Real-time technician chat
            </p>
            <Link
              href={`https://wa.me/${COMPANY_WHATSAPP}`}
              className="text-tertiary-fixed-dim bg-tertiary-container px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-tight hover:opacity-90 transition-opacity inline-block"
            >
              Start Chat
            </Link>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <MapPin className="w-5 h-5 text-primary mt-1 shrink-0" />
          <div>
            <h4 className="font-bold text-primary font-headline">
              HQ Location
            </h4>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              {COMPANY_ADDRESS.street},
              <br />
              {COMPANY_ADDRESS.city}, {COMPANY_ADDRESS.postcode},{" "}
              {COMPANY_ADDRESS.state}
              <br />
              {COMPANY_ADDRESS.country}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Mail className="w-5 h-5 text-primary mt-1 shrink-0" />
          <div>
            <h4 className="font-bold text-primary font-headline">
              Email Direct
            </h4>
            <Link
              href={`mailto:${COMPANY_EMAIL}`}
              className="text-on-surface-variant text-sm hover:text-primary transition-colors"
            >
              {COMPANY_EMAIL}
            </Link>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Clock className="w-5 h-5 text-primary mt-1 shrink-0" />
          <div>
            <h4 className="font-bold text-primary font-headline">
              Business Hours
            </h4>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              Monday – Friday: 8:00 AM – 6:00 PM
              <br />
              Saturday: 8:00 AM – 1:00 PM
              <br />
              <span className="text-tertiary-fixed-variant font-semibold">
                24/7 Emergency Support
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
