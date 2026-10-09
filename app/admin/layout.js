export const metadata = {
  title: { default: "Admin panel", template: "%s | Admin panel" },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }) {
  return <div className="min-h-dvh bg-slate-50">{children}</div>;
}
