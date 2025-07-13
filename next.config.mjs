/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http", // Protocol should be 'https'
        hostname: "localhost", // Only the hostname
        port: "3000",
        // https://bkh4k412-3000.asse.devtunnels.ms
      },
    ],
  },
};

export default nextConfig;
