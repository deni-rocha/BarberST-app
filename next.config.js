/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "build",
  env: {
    publicAuthUrl: "https://barber-st-auth-api.vercel.app/api",
  },
};

module.exports = nextConfig;
