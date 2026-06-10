import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { ProductsGrid } from "@/components/sections/products-grid";
import { CTASection } from "@/components/sections/cta-section";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Products & Equipment",
  description:
    "Our specialized fleet and equipment for sewerage maintenance, structural engineering, and industrial cleaning operations.",
};

export default function ProductsPage() {
  return (
    <>
      <Hero
        badge="Our Fleet & Equipment"
        headline="Specialized"
        highlightedText="Products"
        description="State-of-the-art equipment and machinery for professional sewerage, structural, and industrial maintenance operations."
        primaryCta={{ label: "Book Service", href: "/contact" }}
        secondaryCta={{ label: "View Services", href: "/services" }}
        size="medium"
      />

      <ProductsGrid products={products} />

      <CTASection variant="light" />
    </>
  );
}
