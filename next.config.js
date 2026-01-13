/** @type {import('next').NextConfig} */

const customRedirectRules = require('./redirect-config/redirects');
const securityHeaders = [
  // 1️⃣ Content Security Policy
  // {
  //   key: "Content-Security-Policy",
  //   value: `
  //     default-src 'self';
  //     script-src 'self' https://www.googletagmanager.com https://www.google-analytics.com;
  //     style-src 'self' 'unsafe-inline';
  //     img-src 'self' https://images.miah.shop https://www.google-analytics.com data:;
  //     font-src 'self' data:;
  //     connect-src 'self' https://miah.shop https://api.miah.shop https://www.google-analytics.com;
  //     frame-src 'self' https://www.googletagmanager.com;
  //     frame-ancestors 'self';
  //     object-src 'none';
  //     base-uri 'self';
  //     form-action 'self';
  //     upgrade-insecure-requests;
  //   `.replace(/\s{2,}/g, " ").trim(),
  // },

  // 2️⃣ Clickjacking protection
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },

  // 3️⃣ Prevent MIME sniffing
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },

  // 4️⃣ Referrer information control
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },

  // 5️⃣ Permissions control
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), fullscreen=(self)",
  },

  // 6️⃣ Enforce HTTPS
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
]
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*", 
        has: [{ type: "host", value: "www.miah.shop" }],
        destination: "https://miah.shop/:path*", 
        permanent: true, 
      },
      {
        source: '/308',
        destination: '/301',
        permanent: true,
      },
      ...customRedirectRules,
    ];
  },
    async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  reactStrictMode: true,
  images: {
    domains: ["images.miah.shop"],
  },
  env: {
    NEXTAUTH_URL: process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://miah.shop",
    NEXT_SHARP_PATH: "/tmp/node_modules/sharp",
  },
};

module.exports = nextConfig;
