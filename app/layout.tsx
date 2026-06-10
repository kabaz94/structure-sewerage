import type { Metadata } from "next";
import { Work_Sans, Inter } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SkipLink } from "@/components/layout/skip-link";
import { COMPANY_DESCRIPTION, COMPANY_NAME, COMPANY_URL } from "@/lib/constants";
import "./globals.css";

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-headline",
  weight: ["400", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: `${COMPANY_NAME} | Professional Infrastructure Solutions`,
    template: `%s | ${COMPANY_NAME}`,
  },
  description: COMPANY_DESCRIPTION,
  metadataBase: new URL(COMPANY_URL),
  openGraph: {
    type: "website",
    locale: "en_MY",
    siteName: COMPANY_NAME,
    title: `${COMPANY_NAME} | Professional Infrastructure Solutions`,
    description: COMPANY_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${COMPANY_NAME} | Professional Infrastructure Solutions`,
    description: COMPANY_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${workSans.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col font-body bg-background text-on-background antialiased">
        <SkipLink />
        <Navbar />
        <main id="main-content" className="flex-1 pt-[72px]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
