/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "shopgrids.onrender.com",
        port: "",
        pathname: "/media/products/**",
      },
    ],
  },
};

module.exports = nextConfig;
