import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: 'Commish',
		short_name: 'Commish',
		description: 'Track your commissions and earnings.',
		start_url: '/',
		display: 'standalone',
		background_color: '#ffffff',
		theme_color: '#0026d5',
		icons: [
			{
				src: '/icon-192.png',
				sizes: '192x192',
				type: 'image/png',
			},
			{
				src: '/icon-512.png',
				sizes: '512x512',
				type: 'image/png',
			}
		],
	}
}