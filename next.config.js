/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	experimental: {
		externalDir: true,
		optimizePackageImports: ["@chakra-ui/react"],
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "images.unsplash.com",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "images.pexels.com",
				pathname: "/**",
			},
		],
	},
};
