import { getPublishedStaffSlugs } from "@/lib/data/site";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default async function sitemap() {
  const staff = await getPublishedStaffSlugs();
  return [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/oqituvchilar`, changeFrequency: "monthly", priority: 0.8 },
    ...staff.map(({ slug }) => ({ url: `${SITE_URL}/oqituvchilar/${slug}`, changeFrequency: "monthly", priority: 0.6 })),
  ];
}
