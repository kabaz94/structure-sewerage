import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import { blogPosts } from "@/data/blog-posts";
import { Badge } from "@/components/shared/badge";
import { FadeUp } from "@/components/shared/fade-up";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);

  return (
    <>
      {/* Header */}
      <section className="relative bg-primary py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
          <FadeUp>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-primary-fixed-dim hover:text-white transition-colors mb-8 text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </FadeUp>
          <FadeUp delay={0.1}>
            <Badge className="mb-6">{post.category}</Badge>
            <h1 className="text-3xl md:text-5xl font-black font-headline tracking-tighter text-white leading-tight mb-6">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-primary-fixed-dim text-sm">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString("en-MY", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {post.author}
              </span>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6 lg:px-8 max-w-4xl mx-auto">
        <FadeUp>
          <article
            className="prose prose-lg max-w-none prose-headings:font-headline prose-headings:text-primary prose-headings:font-bold prose-a:text-primary prose-img:rounded-xl"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </FadeUp>

        {/* Tags */}
        <FadeUp delay={0.1}>
          <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-outline-variant/20">
            <Tag className="w-4 h-4 text-on-surface-variant mt-1" />
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium text-on-surface-variant bg-surface-container px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 px-6 lg:px-8 max-w-7xl mx-auto bg-surface-container-low">
          <FadeUp>
            <h2 className="text-3xl font-black font-headline text-primary mb-10">
              Related Articles
            </h2>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((related, i) => (
              <FadeUp key={related.slug} delay={i * 0.1}>
                <Link
                  href={`/blog/${related.slug}`}
                  className="block bg-surface-container-lowest p-6 rounded-2xl hover:shadow-md transition-all group"
                >
                  <Badge variant="blue" className="mb-4 text-[10px]">
                    {related.category}
                  </Badge>
                  <h3 className="font-bold font-headline text-primary group-hover:text-primary-container transition-colors mb-2 line-clamp-2">
                    {related.title}
                  </h3>
                  <p className="text-sm text-on-surface-variant line-clamp-2">
                    {related.excerpt}
                  </p>
                </Link>
              </FadeUp>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
