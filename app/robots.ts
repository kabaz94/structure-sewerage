import { MetadataRoute } from "next";

export const dynamic = "force-static";
import { COMPANY_URL } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${COMPANY_URL}/sitemap.xml`,
  };
}
