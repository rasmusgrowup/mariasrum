module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['media.graphassets.com', 'media.graphcms.com', 'eu-central-1.graphassets.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.graphassets.com',
      },
    ],
  },
}
