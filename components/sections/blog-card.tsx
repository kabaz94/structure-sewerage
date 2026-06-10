import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, User } from "lucide-react";
import { BlogPost } from "@/types";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="bg-surface-container-lowest rounded-3xl overflow-hidden border border-outline-variant/10 ambient-shadow group card-hover">
      <Link href={`/blog/${post.slug}`}>
        <div className="relative h-56 overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-tertiary-fixed text-on-tertiary-fixed text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
              {post.category}
            </span>
          </div>
        </div>
      </Link>

      <div className="p-6">
        <div className="flex items-center gap-4 text-xs text-on-surface-variant mb-4">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {new Date(post.date).toLocaleDateString("en-MY", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
          <span className="flex items-center gap-1">
            <User className="w-3 h-3" />
            {post.author}
          </span>
        </div>

        <Link href={`/blog/${post.slug}`}>
          <h3 className="text-xl font-bold font-headline text-primary mb-3 line-clamp-2 hover:text-primary-container transition-colors">
            {post.title}
          </h3>
        </Link>

        <p className="text-on-surface-variant text-sm leading-relaxed mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-on-surface-variant bg-surface-container px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 text-primary font-bold text-sm group/link"
        >
          Read More
          <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  );
}
