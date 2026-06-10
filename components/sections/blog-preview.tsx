import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { BlogCard } from "@/components/sections/blog-card";
import { StaggerChildren, StaggerItem } from "@/components/shared/stagger-children";
import { blogPosts } from "@/data/blog-posts";

export function BlogPreview() {
  const previewPosts = blogPosts.slice(0, 3);

  return (
    <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        title="Latest Insights"
        subtitle="Expert perspectives on sewerage infrastructure, regulatory compliance, and industrial maintenance best practices."
      />

      <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {previewPosts.map((post) => (
          <StaggerItem key={post.slug}>
            <BlogCard post={post} />
          </StaggerItem>
        ))}
      </StaggerChildren>

      <div className="text-center">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 bg-primary text-on-primary px-8 py-4 rounded-lg font-headline font-bold hover:opacity-90 transition-all group"
        >
          See More
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}
