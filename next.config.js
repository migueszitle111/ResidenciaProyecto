/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'res.cloudinary.com',
      'awkrlvbmwfqzqlfyuiby.supabase.co',
    ],
  },

  // Exclude heavy packages from ALL serverless function bundles.
  // These are either client-only libs or were removed from package.json —
  // outputFileTracingExcludes prevents them from being picked up via
  // transitive dependency tracing by Vercel's bundler.
  outputFileTracingExcludes: {
    '*': [
      'node_modules/puppeteer/**',
      'node_modules/puppeteer-core/**',
      'node_modules/@sparticuz/chromium/**',
      'node_modules/@sparticuz/chromium-min/**',
      'node_modules/canvas/**',
      'node_modules/stackblur-canvas/**',
      'node_modules/googleapis/**',
      'node_modules/googleapis-common/**',
      'node_modules/google-auth-library/**',
      'node_modules/pdfmake/**',
      'node_modules/html2canvas/**',
      'node_modules/html2pdf.js/**',
      'node_modules/html-to-image/**',
      'node_modules/3d-flip-book/**',
      'node_modules/@dearhive/**',
      'node_modules/cloudinary/**',
      'node_modules/cloudinary-core/**',
      'node_modules/aws4/**',
      'node_modules/0g/**',
      'node_modules/jspdf/**',
      'node_modules/swiper/**',
      'node_modules/react-image-gallery/**',
      'node_modules/react-pdf-flipbook-viewer/**',
      'node_modules/react-quill/**',
      'node_modules/react-slick/**',
      'node_modules/slick-carousel/**',
      'node_modules/framer-motion/**',
      'node_modules/@dearhive/**',
    ],
  },

  async headers() {
    return [
      {
        source: '/pdfs/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
          { key: 'Content-Type',  value: 'application/pdf' },
        ],
      },
      {
        source: '/dflip/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },

  webpack: (config) => {
    config.module.rules.push({
      test: /\.map$/,
      use: ['ignore-loader'],
    });
    return config;
  },
};

module.exports = nextConfig;
