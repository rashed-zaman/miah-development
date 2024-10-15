/** @type {import('next').NextConfig} */

const nextConfig = {
  async redirects() {
    return [
      {
        source: "/(.*)",
        has: [{ type: "host", value: "www.miah.shop" }], // Redirect www to non-www
        destination: "https://miah.shop/:1",
        permanent: true,
      },
      {
        source: "/(.*)",
        has: [{ type: "protocol", value: "http" }], // Redirect http to https
        destination: "https://miah.shop/:1",
        permanent: true,
      },
    ];
  },
  reactStrictMode: true,
  images: {
    domains: ["images.miah.shop"],
  },
  env: {
    NEXTAUTH_URL: "http://192.168.1.119",
    NEXT_SHARP_PATH: "/tmp/node_modules/sharp",
  },
};

module.exports = nextConfig;
