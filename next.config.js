const { withFaust, getWpHostname } = require('@faustwp/core');

/**
 * @type {import('next').NextConfig}
 **/
module.exports = withFaust({
  reactStrictMode: true,
  sassOptions: {
    includePaths: ['node_modules'],
  },
  images: {
    domains: ['backend-anawana.local'],
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  async rewrites() {
    return [
      {
        source: '/wp-content/:path*',
        destination: 'http://localhost/anawana/wp-content/:path*', // Ajusta esta ruta según tu configuración local
      },
    ]
  },
});
