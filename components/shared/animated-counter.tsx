"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValue, useSpring, useTransform, motion, useReducedMotion } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  isDecimal?: boolean;
  className?: string;
}

export function AnimatedCounter({
  value,
  suffix,
  prefix,
  isDecimal,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    stiffness: 100,
    damping: 30,
    duration: 2000,
  });

  const displayValue = useTransform(springValue, (val) =>
    isDecimal
      ? val.toFixed(1)
      : Math.floor(val).toLocaleString()
  );

  useEffect(() => {
    if (prefersReducedMotion) {
      setHasAnimated(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          motionValue.set(value);
          observer.unobserve(element);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [value, hasAnimated, motionValue, prefersReducedMotion]);

  const finalValue = isDecimal
    ? value.toFixed(1)
    : value.toLocaleString();

  return (
    <div ref={ref} className={className}>
      {prefersReducedMotion ? (
        <span>
          {prefix}
          {finalValue}
          {suffix}
        </span>
      ) : (
        <span>
          {prefix}
          {hasAnimated ? (
            <motion.span>{displayValue}</motion.span>
          ) : (
            "0"
          )}
          {suffix}
        </span>
      )}
    </div>
  );
}
