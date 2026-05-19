/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'res.cloudinary.com',
      'awkrlvbmwfqzqlfyuiby.supabase.co',
    ],
  },

  experimental: {
    // Only server-side / Node.js packages go here — NOT client-side UI packages.
    // Listing a client package here prevents Next.js from bundling it for SSR,
    // which causes "Element type is invalid: got undefined" prerender errors.
    serverComponentsExternalPackages: [
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
      'puppeteer',
      'puppeteer-core',
    ],

    // Exclude public/ image folders from serverless function bundles.
    // PDF routes fetch images from the Render backend at runtime.
    // public/fonts is kept because loadFontBytes reads it via fs.
    outputFileTracingExcludes: {
      '**': [
        'public/assets/**',
        'public/pdfs/**',
        'public/AuditivaImg/**',
        'public/VisualImg/**',
        'public/SomatosensorialImg/**',
        'public/MiopatiaImg/**',
        'public/MotoresImg/**',
        'public/NeuropatiaImg/**',
        'public/NeuronopatiaImg/**',
        'public/PlexopatiaImg/**',
        'public/PolineuropatiaImg/**',
        'public/RadiculopatiaImg/**',
        'public/UnionNeuromuscularImg/**',
      ],
    },
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
      // Imagen OG: cacheable 1 hora, accesible sin auth para scrapers de WhatsApp/Facebook
      {
        source: '/og-medxpro.png',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=3600, stale-while-revalidate=86400' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
        ],
      },
      // Páginas de links compartidos: sin restricción de cache para scrapers OG
      {
        source: '/s/:slug*',
        headers: [
          { key: 'Cache-Control', value: 'public, s-maxage=60, stale-while-revalidate=300' },
          { key: 'X-Robots-Tag', value: 'noindex' },
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
