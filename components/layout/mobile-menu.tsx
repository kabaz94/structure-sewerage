"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { X, Phone, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavLink } from "@/types";
import { COMPANY_PHONE, COMPANY_WHATSAPP } from "@/lib/constants";

interface MobileMenuProps {
  onClose: () => void;
  navLinks: NavLink[];
  currentPath: string;
}

export function MobileMenu({
  onClose,
  navLinks,
  currentPath,
}: MobileMenuProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 lg:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Panel */}
      <motion.div
        className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-2xl"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
      >
        <div className="flex flex-col h-full p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <span className="text-lg font-black font-headline text-primary">
              Menu
            </span>
            <button
              onClick={onClose}
              className="p-2 text-on-surface-variant hover:text-primary transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Links */}
          <nav className="flex flex-col gap-2 mb-8">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center justify-between py-4 px-4 rounded-xl text-lg font-headline font-semibold transition-all",
                    currentPath === link.href ||
                      (link.href !== "/" && currentPath.startsWith(link.href))
                      ? "bg-primary text-white"
                      : "text-on-surface hover:bg-surface-container-low"
                  )}
                >
                  {link.label}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* CTA */}
          <div className="mt-auto space-y-4">
            <Link
              href="/contact"
              onClick={onClose}
              className="flex items-center justify-center gap-2 bg-primary text-on-primary px-6 py-4 rounded-xl font-headline font-bold text-lg hover:bg-primary-container transition-all"
            >
              Request a Quote
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href={`tel:${COMPANY_PHONE}`}
              className="flex items-center justify-center gap-2 bg-tertiary-fixed text-on-tertiary-fixed px-6 py-4 rounded-xl font-headline font-bold text-lg hover:opacity-90 transition-all"
            >
              <Phone className="w-5 h-5" />
              Call Now
            </Link>
            <Link
              href={`https://wa.me/${COMPANY_WHATSAPP}`}
              className="flex items-center justify-center gap-2 bg-[#25D366]/10 text-[#25D366] px-6 py-4 rounded-xl font-headline font-bold text-lg hover:bg-[#25D366]/20 transition-all"
            >
              WhatsApp Support
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
