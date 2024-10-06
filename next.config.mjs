/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["x2lcrkk2g3m81lpd.public.blob.vercel-storage.com"],
    
},
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
