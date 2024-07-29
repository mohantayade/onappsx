/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: `${process.env.BACKEND_URI}:path*` // Proxy to Backend
          }
        ]
      }
};

export default nextConfig;
