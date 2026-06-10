import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="text-8xl font-black font-headline text-primary/10 mb-6">
          404
        </div>
        <h1 className="text-3xl font-black font-headline text-primary mb-4">
          Page Not Found
        </h1>
        <p className="text-on-surface-variant mb-10 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let us help you find what you need.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-primary text-on-primary px-8 py-4 rounded-lg font-bold inline-flex items-center justify-center gap-2 hover:opacity-90 transition-all"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="border-2 border-primary text-primary px-8 py-4 rounded-lg font-bold inline-flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
