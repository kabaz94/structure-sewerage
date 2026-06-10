import { CheckCircle2 } from "lucide-react";
import { FadeUp } from "@/components/shared/fade-up";
import { Product } from "@/types";

interface ProductsGridProps {
  products: Product[];
}

export function ProductsGrid({ products }: ProductsGridProps) {
  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto">
      {categories.map((category) => {
        const categoryProducts = products.filter((p) => p.category === category);
        return (
          <div key={category} className="mb-16 last:mb-0">
            <h2 className="text-3xl font-bold font-headline text-primary mb-8">
              {category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryProducts.map((product, index) => (
                <FadeUp key={product.slug} delay={index * 0.1}>
                  <div className="bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/10 ambient-shadow h-full flex flex-col group card-hover">
                    <h3 className="text-xl font-bold font-headline text-primary mb-4">
                      {product.title}
                    </h3>
                    <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                      {product.description}
                    </p>
                    <ul className="space-y-3 mt-auto">
                      {product.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-2 text-sm text-on-surface-variant"
                        >
                          <CheckCircle2 className="w-4 h-4 text-tertiary-container shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
