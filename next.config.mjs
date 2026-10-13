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
  experimental: {
    serverActions: {
      // Vercel funksiyalarining so'rov chegarasi 4,5 MB; rasmlar brauzerda oldindan siqiladi.
      bodySizeLimit: "4.5mb",
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async rewrites() {
    return [
      // Xodimlar rasmlari /images/xodimlar/ ga ko'chirilgan; eski manzil keshlangan sahifalarda buzilmasin.
      { source: "/images/staff/:file", destination: "/images/xodimlar/:file" },
    ];
  },
};

export default nextConfig;
