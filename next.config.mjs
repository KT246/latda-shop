/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https", // Protocol should be 'https'

        hostname: "skvgroupbucket.s3.ap-southeast-1.amazonaws.com", // Only the hostname

        // port: "3000",
        // https://bkh4k412-3000.asse.devtunnels.ms
      },
    ],
  },
};

export default nextConfig;
