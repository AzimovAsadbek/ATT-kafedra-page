/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig = {
  reactCompiler: true,
  poweredByHeader: false,
  serverExternalPackages: ["@libsql/client", "libsql"],
  experimental: {
    serverActions: {
      // Rasm yuklash uchun (maksimal fayl hajmi 5 MB + forma maydonlari)
      bodySizeLimit: "6mb",
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // Boshlang'ich (seed) rasmlar manbalari. Admin paneldan yuklangan rasmlar /media/ orqali beriladi.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "static.tuit.uz", pathname: "/uploads/**" },
    ],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
