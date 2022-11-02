/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')

const nextConfig = withPWA({
  reactStrictMode: true,
  swcMinify: true,
  pwa: {
    dest: 'public',
    registes: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
  },
})

module.exports = nextConfig
