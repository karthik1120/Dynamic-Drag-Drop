/** @type {import('next').NextConfig} */

// npm i babel-preset-next
const nextConfig = {
  output: 'standalone',
  reactStrictMode: false,
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  async rewrites() {
    return [
      // Rewrite everything to `pages/index`
      {
        source: '/:any*',
        destination: '/',
      },
    ]
  },
}

module.exports = nextConfig
