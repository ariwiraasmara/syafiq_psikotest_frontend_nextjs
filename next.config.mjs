/** @type {import('next').NextConfig} */
import MillionLint from "@million/lint";
// const nextConfig = {};
const nextConfig = {
    devIndicators: {
      errorOverlay: false, // Menonaktifkan error overlay
    },
};

// export default nextConfig;
export default MillionLint.next({
    rsc: true,
    filter: {
        include: ["**/components/*.{mtsx,mjsx,tsx,jsx}", "**/app/*.{mtsx,mjsx,tsx,jsx}"],
    },
})(nextConfig);
