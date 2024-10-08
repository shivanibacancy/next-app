/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.**.com', 
                port: '',
                pathname: '/a/**',
            },
        ],
    },
};

export default nextConfig;
