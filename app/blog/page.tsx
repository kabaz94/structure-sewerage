import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { BlogCard } from "@/components/sections/blog-card";
import { StaggerChildren, StaggerItem } from "@/components/shared/stagger-children";
import { SectionHeading } from "@/components/shared/section-heading";
import { blogPosts } from "@/data/blog-posts";

export const metadata: Metadata = {
  title: "Blog & Insights",
  description:
    "Expert insights on sewerage maintenance, wastewater management, regulatory compliance, and infrastructure engineering.",
};

export default function BlogPage() {
  return (
    <>
      <Hero
        badge="Insights & Updates"
        headline="Engineering"
        highlightedText="Blog"
        description="Expert perspectives on sewerage infrastructure, regulatory compliance, and industrial maintenance best practices."
        primaryCta={{ label: "Contact Us", href: "/contact" }}
        size="medium"
      />

      <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionHeading
          title="Latest Articles"
          subtitle="Stay informed with the latest industry insights, technical guides, and company news."
        />

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <StaggerItem key={post.slug}>
              <BlogCard post={post} />
            </StaggerItem>
          ))}
        </StaggerChildren>
      </section>
    </>
  );
}
