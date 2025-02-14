/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
  },
  webpack: (config) => {
    // Añade esta regla para ignorar cualquier .map
    config.module.rules.push({
      test: /\.map$/,
      use: ['ignore-loader'], // o ['null-loader']
    });

    return config;
  },
};

module.exports = nextConfig;
