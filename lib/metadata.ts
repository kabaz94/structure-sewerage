import { Metadata } from "next";
import { COMPANY_DESCRIPTION, COMPANY_NAME, COMPANY_URL } from "./constants";

export function createPageMetadata({
  title,
  description,
  path = "",
  ogImage,
}: {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
}): Metadata {
  const url = `${COMPANY_URL}${path}`;
  return {
    title,
    description,
    openGraph: {
      title: `${title} | ${COMPANY_NAME}`,
      description,
      url,
      siteName: COMPANY_NAME,
      locale: "en_MY",
      type: "website",
      images: ogImage
        ? [{ url: ogImage, width: 1200, height: 630 }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${COMPANY_NAME}`,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
    alternates: {
      canonical: url,
    },
  };
}

export const defaultMetadata: Metadata = {
  title: {
    default: `${COMPANY_NAME} | Professional Infrastructure Solutions`,
    template: `%s | ${COMPANY_NAME}`,
  },
  description: COMPANY_DESCRIPTION,
  metadataBase: new URL(COMPANY_URL),
  openGraph: {
    siteName: COMPANY_NAME,
    locale: "en_MY",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};
