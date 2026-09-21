import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'

const poppins = Poppins({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
	title: "Commish",
	description: "Commission management app",
};

export default function RootLayout({ children, }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={`${poppins.className} h-full antialiased`}>
			<body>
				{children}
				<Toaster />
			</body>
		</html>
	)
}