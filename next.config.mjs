/** @type {import('next').NextConfig} */
// const nextConfig = {};
const nextConfig = {
    devIndicators: {
      errorOverlay: false, // Menonaktifkan error overlay
    },
    reactStrictMode: true,
    experimental: {
        appDir: true, // Mengaktifkan mode appDir (opsional jika Anda ingin menggunakan fitur aplikasi terbaru)
        ssr: false,  // Menonaktifkan SSR untuk seluruh aplikasi
    }
};

export default nextConfig;