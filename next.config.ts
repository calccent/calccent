/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow dev access from specific IPs (add yours here)
  allowedDevOrigins: ['192.168.56.1', 'localhost', '127.0.0.1'],

  // Optional: Add image optimization settings
  images: {
    domains: [], // Add external image domains if needed
  },

  // Optional: Disable x-powered-by header for security
  poweredByHeader: false,

  // Optional: Enable React Strict Mode
  reactStrictMode: true,
};

module.exports = nextConfig;