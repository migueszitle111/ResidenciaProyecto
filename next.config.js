/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'res.cloudinary.com',
      'awkrlvbmwfqzqlfyuiby.supabase.co',
    ],
  },

  serverExternalPackages: [
    'canvas',
    'pdfmake',
    'html2canvas',
    'html2pdf.js',
    'html-to-image',
    'stackblur-canvas',
    '3d-flip-book',
    '@dearhive/dearflip-jquery-flipbook',
    'cloudinary',
    'cloudinary-core',
    'jspdf',
    'swiper',
    'react-image-gallery',
    'react-pdf-flipbook-viewer',
    'react-quill',
    'react-slick',
    'slick-carousel',
    'framer-motion',
    'react-icons',
    'puppeteer',
    'puppeteer-core',
  ],

  // Exclude ALL public/ image folders from serverless function bundles.
  // PDF routes now fetch images from the Render backend at runtime.
  // public/fonts is kept because loadFontBytes reads it via fs.
  outputFileTracingExcludes: {
    '*': [
      './public/assets/**',
      './public/pdfs/**',
      './public/AuditivaImg/**',
      './public/VisualImg/**',
      './public/SomatosensorialImg/**',
      './public/MiopatiaImg/**',
      './public/MotoresImg/**',
      './public/NeuropatiaImg/**',
      './public/NeuronopatiaImg/**',
      './public/PlexopatiaImg/**',
      './public/PolineuropatiaImg/**',
      './public/RadiculopatiaImg/**',
      './public/UnionNeuromuscularImg/**',
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
