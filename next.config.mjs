/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http", // Protocol should be 'https'
        hostname: "localhost", // Only the hostname
        port: "8000",
      },
    ],
  },
};

export default nextConfig;
