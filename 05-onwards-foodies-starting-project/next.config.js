/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname:
					'sanjibadhya-demo-next-foodie-app-images.s3.eu-north-1.amazonaws.com',
				port: '',
				pathname: '/**',
			},
		],
	},
};

module.exports = nextConfig;
