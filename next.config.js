/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://ryuheeyoung.github.io/next-ts-diary/' : ''
}

module.exports = nextConfig
