/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'http2.mlstatic.com',
      'i.zst.com.br',
    ]
  }
}

module.exports = nextConfig
