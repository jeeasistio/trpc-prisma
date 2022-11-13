/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    rewrites() {
        return [
            {
                source: '/',
                destination: '/ssr',
            },
        ]
    },
    experimental: {
        appDir: true,
    },
}

module.exports = nextConfig
