/** @type {import('next').NextConfig} */
// const nextConfig = {};
// const HttpTrustedURLScripts = 'http://localhost:3000 http://localhost:8000 https://another.example.com';
// const HttpTrustedURLImages = 'http://localhost:3000 http://localhost:8000 https://another.example.com';
const nextConfig = {
    devIndicators: {
      errorOverlay: true, // Menonaktifkan error overlay
    },
    reactStrictMode: false, //true,
};

/*
    async headers() {
      return [
        {
          source: '/(.*)', // Apply to all routes
          headers: [
            {
              key: 'Content-Security-Policy',
              value: `default-src 'self';
                      script-src 'self' ${HttpTrustedURLScripts};
                      style-src 'self' 'unsafe-inline';
                      img-src 'self' ${HttpTrustedURLImages};`,
            },
          ],
        },
      ]
    },
 */

export default nextConfig;