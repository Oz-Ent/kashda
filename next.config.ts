import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Enable static export for Firebase Hosting
  output: "export",
  trailingSlash: true, // Required for static export
  images: {
    unoptimized: true, // Required for static export
  },
  // Add security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
