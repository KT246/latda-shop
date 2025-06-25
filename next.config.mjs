/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https", // Protocol should be 'https'
        hostname: "8abb-117-2-49-250.ngrok-free.app", // Only the hostname
      },
    ],
  },
};

export default nextConfig;
