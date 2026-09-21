import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration'

const poppins = Poppins({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
	title: "Commish",
	description: "Commission management app",
	icons: {
		icon: '/favicon.ico',
		apple: '/apple-touch-icon.png',
	}
};

export default function RootLayout({ children, }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={`${poppins.className} h-full antialiased`}>
			<body>
				{children}
				<Toaster />
				<ServiceWorkerRegistration />
			</body>
		</html>
	)
}