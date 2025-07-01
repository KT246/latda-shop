/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https", // Protocol should be 'https'
        hostname: "bkh4k412-3000.asse.devtunnels.ms", // Only the hostname
      },
    ],
  },
};

export default nextConfig;
