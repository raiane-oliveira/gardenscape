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
        hostname: "pub-2226e8028e4941c7a347c50887830dcb.r2.dev",
      },
    ],
  },
}

export default nextConfig
