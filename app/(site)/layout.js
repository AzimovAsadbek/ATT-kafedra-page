import Footer from "@/components/site/Footer";
import Navbar from "@/components/site/Navbar";
import TopBar from "@/components/site/TopBar";
import { getPublishedLinks, getSettings } from "@/lib/data/site";

export default async function SiteLayout({ children }) {
  const [settings, links] = await Promise.all([getSettings(), getPublishedLinks()]);

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] bg-white px-4 py-2 font-medium text-brand-950 focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Asosiy mazmunga oʻtish
      </a>
      <TopBar settings={settings} />
      <Navbar />
      <main id="main">{children}</main>
      <Footer settings={settings} links={links} />
    </>
  );
}
