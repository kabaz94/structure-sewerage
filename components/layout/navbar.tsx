"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { navLinks } from "@/data/navigation";
import { COMPANY_PHONE } from "@/lib/constants";
import { useScrollDirection } from "@/hooks/use-scroll-direction";
import { MobileMenu } from "./mobile-menu";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { scrollDirection, isAtTop } = useScrollDirection();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 w-full z-50 border-b transition-all duration-300",
          isAtTop
            ? "border-transparent"
            : "border-outline-variant/10 glass-nav"
        )}
        initial={{ y: 0 }}
        animate={{ y: scrollDirection === "down" && !isAtTop ? -100 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <nav className="flex justify-between items-center py-4 px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/images/logorm.png"
              alt="Structure Sewerage"
              className="h-14 w-auto"
            />
            {/* <span className="text-xl md:text-2xl font-black tracking-tighter text-primary font-headline">
              Structure Sewerage
            </span> */}
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "font-headline font-semibold tracking-tight text-sm transition-colors duration-300",
                  pathname === link.href ||
                    (link.href !== "/" && pathname.startsWith(link.href))
                    ? "text-primary border-b-2 border-tertiary-fixed pb-1"
                    : "text-on-surface-variant hover:text-primary"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href={`tel:${COMPANY_PHONE}`}
              className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors text-sm font-medium"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden xl:inline">{COMPANY_PHONE}</span>
            </Link>
            <Link
              href="/contact"
              className="bg-primary hover:bg-primary-container text-on-primary px-6 py-2.5 rounded-lg font-headline font-bold text-sm transition-all active:scale-95 shadow-lg shadow-primary/10"
            >
              Request a Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-primary"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            onClose={() => setIsMobileMenuOpen(false)}
            navLinks={navLinks}
            currentPath={pathname}
          />
        )}
      </AnimatePresence>
    </>
  );
}
