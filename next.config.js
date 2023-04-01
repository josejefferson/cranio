/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    apiEndpoint: process.env.API_ENDPOINT || '/api'
  }
}

module.exports = nextConfig
