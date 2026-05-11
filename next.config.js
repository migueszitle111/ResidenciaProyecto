/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'res.cloudinary.com',
      'awkrlvbmwfqzqlfyuiby.supabase.co',
    ],
  },

  async headers() {
    return [
      {
        /* PDFs estáticos: caché agresiva en CDN + browser */
        source: '/pdfs/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
          { key: 'Content-Type',  value: 'application/pdf' },
        ],
      },
      {
        /* Librería dflip: también cacheable */
        source: '/dflip/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },

  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.map$/,
      use: ['ignore-loader'],
    });
    if (isServer) {
      config.externals = [
        ...(Array.isArray(config.externals) ? config.externals : [config.externals].filter(Boolean)),
        'puppeteer',
        'puppeteer-core',
        '@sparticuz/chromium',
        '@sparticuz/chromium-min',
      ];
    }
    return config;
  },
};

module.exports = nextConfig;
