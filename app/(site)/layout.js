import Footer from "@/components/site/Footer";
import Navbar from "@/components/site/Navbar";
import { getPublishedLinks, getSettings } from "@/lib/data/site";

export default async function SiteLayout({ children }) {
  const [settings, links] = await Promise.all([getSettings(), getPublishedLinks()]);

  return (
    <>
      <a
        href="#main"
        className="sr-only z-60 rounded-lg bg-white px-4 py-2 font-semibold text-brand-900 focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Asosiy mazmunga oʻtish
      </a>
      <Navbar />
      <main id="main">{children}</main>
      <Footer settings={settings} links={links} />
    </>
  );
}
