const createNextIntlPlugin = require('next-intl/plugin')

const withNextIntl = createNextIntlPlugin('./i18n.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {

  // Necesar pentru Docker — generează server.js standalone
  output: 'standalone',

  experimental: {
    serverComponentsExternalPackages: ['@anthropic-ai/sdk'],
  },
}

module.exports = withNextIntl(nextConfig)
