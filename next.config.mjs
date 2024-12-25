/** @type {import('next').NextConfig} */
import MillionLint from "@million/lint";
// const nextConfig = {};
const nextConfig = {
    devIndicators: {
      errorOverlay: false, // Menonaktifkan error overlay
    },
    reactStrictMode: true,
    experimental: {
        appDir: true, // Mengaktifkan mode appDir (opsional jika Anda ingin menggunakan fitur aplikasi terbaru)
        ssr: false,  // Menonaktifkan SSR untuk seluruh aplikasi
    },
};

// export default nextConfig;
export default MillionLint.next({
    rsc: true,
    filter: {
        include: ["**/components/*.{mtsx,mjsx,tsx,jsx}", "**/app/*.{mtsx,mjsx,tsx,jsx}"],
    },
})(nextConfig);
