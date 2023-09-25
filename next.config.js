/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.miah.shop'],
  },
  env: {
    NEXTAUTH_URL: 'http://192.168.1.119',
    NEXT_SHARP_PATH: "/tmp/node_modules/sharp"
  },
}

module.exports = nextConfig
