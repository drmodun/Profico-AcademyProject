/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["media.rawg.io"],
    },
    experimental: {
        appDir: true, 
    },
}

module.exports = nextConfig
