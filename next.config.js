/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/dmhxcjyna/image/upload/v1681772608/**",
      },
    ],
  },
};

module.exports = nextConfig;
