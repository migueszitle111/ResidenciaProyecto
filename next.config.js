const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'res.cloudinary.com',
      'awkrlvbmwfqzqlfyuiby.supabase.co',
    ],
  },

  // Tell Next.js bundler to never include these packages in server bundles.
  // They are either browser-only or not used in any API route.
  serverExternalPackages: [
    'canvas',
    'googleapis',
    'googleapis-common',
    'google-auth-library',
    'gaxios',
    'gcp-metadata',
    'gtoken',
    'pdfmake',
    'html2canvas',
    'html2pdf.js',
    'html-to-image',
    'stackblur-canvas',
    '3d-flip-book',
    '@dearhive/dearflip-jquery-flipbook',
    'cloudinary',
    'cloudinary-core',
    'aws4',
    'jspdf',
    'swiper',
    'react-image-gallery',
    'react-pdf-flipbook-viewer',
    'react-quill',
    'react-slick',
    'slick-carousel',
    'framer-motion',
    'puppeteer',
    'puppeteer-core',
    '@sparticuz/chromium',
    '@sparticuz/chromium-min',
  ],

  // Belt-and-suspenders: also exclude via file tracing
  outputFileTracingExcludes: {
    'app/**': [
      './node_modules/canvas/**',
      './node_modules/stackblur-canvas/**',
      './node_modules/googleapis/**',
      './node_modules/googleapis-common/**',
      './node_modules/google-auth-library/**',
      './node_modules/gaxios/**',
      './node_modules/gcp-metadata/**',
      './node_modules/gtoken/**',
      './node_modules/pdfmake/**',
      './node_modules/html2canvas/**',
      './node_modules/html2pdf.js/**',
      './node_modules/html-to-image/**',
      './node_modules/3d-flip-book/**',
      './node_modules/@dearhive/**',
      './node_modules/cloudinary/**',
      './node_modules/cloudinary-core/**',
      './node_modules/aws4/**',
      './node_modules/0g/**',
      './node_modules/jspdf/**',
      './node_modules/swiper/**',
      './node_modules/react-image-gallery/**',
      './node_modules/react-pdf-flipbook-viewer/**',
      './node_modules/react-quill/**',
      './node_modules/react-slick/**',
      './node_modules/slick-carousel/**',
      './node_modules/framer-motion/**',
      './node_modules/puppeteer/**',
      './node_modules/puppeteer-core/**',
      './node_modules/@sparticuz/**',
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
