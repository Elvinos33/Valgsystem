/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'elvebakken.vgs.no',
                port: ''
            },
        ],
    },
}

module.exports = nextConfig
