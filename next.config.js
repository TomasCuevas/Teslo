/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "localhost:3000",
      "localhost",
      "res.cloudinary.com",
      "https://teslo-test-tc.vercel.app",
      "teslo-test-tc.vercel.app",
    ],
  },
};

module.exports = nextConfig;
