const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default function sitemap() {
  return [{ url: SITE_URL, changeFrequency: "weekly", priority: 1 }];
}
