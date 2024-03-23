/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: [
      "pdf-parse",
      '@react-email/components',
      '@react-email/render',
      '@react-email/tailwind'
]
  },
};

module.exports = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreBuildErrors: true,
  },
};
