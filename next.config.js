/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    RIDDLE: process.env.RIDDLE,
    CANDIDATE: process.env.CANDIDATE,
  },
};

module.exports = nextConfig;
