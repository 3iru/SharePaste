/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        'localhost:3000',
        // List of allowed origins for server actions, for cloud development environments
        // 'any applicable cloud dev environment link (e.g., Codespaces, Gitpod)',
      ],
    },
  },
};

export default nextConfig;
