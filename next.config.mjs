/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d2seqvvyy3b8p2.cloudfront.net",
      },
      {
        protocol: "https",
        hostname: "bs.plantnet.org",
      },
    ],
  },
}

export default nextConfig
