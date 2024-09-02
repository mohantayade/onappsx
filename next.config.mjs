/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {

      const backendUri = process.env.BACKEND_URI;

        return [
          {
            source: '/api/:path*',
            destination: `${backendUri}:path*` // Proxy to Backend
          }
        ]
      }
};

export default nextConfig;
