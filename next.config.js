/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://next-ts-diary.vercel.app' : ''
}

module.exports = nextConfig
