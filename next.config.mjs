/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  // Since your logs showed a path error earlier:
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ['192.168.29.62'],
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.watchOptions = {
        ignored: ['**/node_modules/**', '**/.next/**'],
        poll: 1000,            // Poll for changes every second
        aggregateTimeout: 500, // Delay rebuild slightly to settle files
      };
    }
    return config;
  }
};

export default nextConfig;