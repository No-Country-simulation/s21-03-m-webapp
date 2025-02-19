import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	output: 'standalone',
	images: {
		unoptimized: true,
		domains: ['upload.wikimedia.org', 'pexels.com', 'unsplash.com'], // Agrega los dominios usados en tus imágenes
	},
	reactStrictMode: false,
};

export default nextConfig;
