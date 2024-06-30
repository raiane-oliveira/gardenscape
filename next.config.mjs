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
      {
        protocol: "https",
        hostname: "pub-9c422a0e9a4b4d22a643785742d51a37.r2.dev",
      },
    ],
  },
}

export default nextConfig
