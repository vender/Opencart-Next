/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                hostname: process.env.NEXT_PUBLIC_OPENCART_DOMAIN_URL.split('//')[1],
                pathname: '/image/**',
            },
            {
                hostname: process.env.NEXT_PUBLIC_OPENCART_DOMAIN_URL.split('//')[1],
                pathname: '/system/storage/upload/**',
                pathname: '/system/storage/**'
            },
            {
                hostname: 'downloader.disk.yandex.ru'
            }
        ],
    },
}

module.exports = nextConfig
