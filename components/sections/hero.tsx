"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Phone, ArrowRight } from "lucide-react";
import { Badge } from "@/components/shared/badge";
import { cn } from "@/lib/utils";

interface HeroProps {
  badge?: string;
  headline: string;
  highlightedText?: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  backgroundImage?: string;
  backgroundImages?: string[];
  className?: string;
  size?: "large" | "medium";
}

export function Hero({
  badge,
  headline,
  highlightedText,
  description,
  primaryCta,
  secondaryCta,
  backgroundImage,
  backgroundImages,
  className,
  size = "large",
}: HeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = backgroundImages && backgroundImages.length > 0
    ? backgroundImages
    : backgroundImage
      ? [backgroundImage]
      : [];

  // Cycle through background images
  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
  };

  const content = (
    <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
      <motion.div
        className="max-w-4xl"
        variants={prefersReducedMotion ? undefined : containerVariants}
        initial={prefersReducedMotion ? undefined : "hidden"}
        animate={prefersReducedMotion ? undefined : "visible"}
      >
        {badge && (
          <motion.div variants={itemVariants}>
            <Badge className="mb-6">{badge}</Badge>
          </motion.div>
        )}

        <motion.h1
          variants={itemVariants}
          className={cn(
            "font-headline font-black tracking-tighter text-white leading-[1.05]",
            size === "large"
              ? "text-5xl md:text-7xl lg:text-8xl"
              : "text-4xl md:text-6xl lg:text-7xl"
          )}
        >
          {headline}
          {highlightedText && (
            <>
              <br />
              <span className="text-tertiary-fixed text-glow">
                {highlightedText}
              </span>
            </>
          )}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className={cn(
            "text-primary-fixed-dim max-w-2xl leading-relaxed font-body",
            size === "large" ? "text-xl mt-8" : "text-lg mt-6"
          )}
        >
          {description}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-wrap gap-4 mt-10"
        >
          {secondaryCta && (
            <Link
              href={secondaryCta.href}
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 md:px-10 py-4 rounded-xl font-bold font-headline hover:bg-white/20 transition-all flex items-center gap-2 group"
            >
              {secondaryCta.label}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </motion.div>
      </motion.div>
    </div>
  );

  return (
    <section
      className={cn(
        "relative overflow-hidden bg-primary",
        size === "large" ? "min-h-[750px]" : "min-h-[450px]",
        "flex items-center",
        className
      )}
    >
      {/* Background Images Slideshow */}
      {images.length > 0 ? (
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            >
              <img
                src={images[currentImageIndex]}
                alt=""
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>
          {/* Gradient overlay — always on top of images */}
          <div className="absolute inset-0 hero-gradient" />
        </div>
      ) : (
        /* Fallback gradient when no image */
        <div className="absolute inset-0 z-0 hero-gradient" />
      )}

      {content}
    </section>
  );
}
