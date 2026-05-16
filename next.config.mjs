/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/not-found',
        destination: '/404',
      },
    ];
  },
};

export default nextConfig;
