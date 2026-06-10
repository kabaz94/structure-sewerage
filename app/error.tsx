"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCw, Home } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Page error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="text-8xl font-black font-headline text-error/10 mb-6">
          !
        </div>
        <h1 className="text-3xl font-black font-headline text-primary mb-4">
          Something Went Wrong
        </h1>
        <p className="text-on-surface-variant mb-10 leading-relaxed">
          We encountered an unexpected error. Please try again or contact us if
          the problem persists.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="bg-primary text-on-primary px-8 py-4 rounded-lg font-bold inline-flex items-center justify-center gap-2 hover:opacity-90 transition-all"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>
          <Link
            href="/"
            className="border-2 border-primary text-primary px-8 py-4 rounded-lg font-bold inline-flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-all"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
