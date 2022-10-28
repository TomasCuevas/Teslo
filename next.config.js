/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["localhost:3000", "localhost", "res.cloudinary.com"],
  },
};

module.exports = nextConfig;
