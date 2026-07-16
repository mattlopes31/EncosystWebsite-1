import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.js');

const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,  // ← ajouter ceci
  },
};

export default withNextIntl(nextConfig);