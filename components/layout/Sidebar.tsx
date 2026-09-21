'use client'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import NavigationLinks from './NavigationLinks'
import { logout } from '@/actions/authActions'
import Image from 'next/image'
import Link from 'next/link'

export default function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
	return (
		<div className="flex h-full max-h-screen flex-col space-y-2">
			<Link
				href="/"
				onClick={onNavigate}
				className="relative shrink-0 border-b border-gray-300 p-4 pt-0"
			>
				<Image src="/logo.png" alt="Commish Logo" width={180} height={36} />
			</Link>

			<div className="min-h-0 flex-1">
				<NavigationLinks onNavigate={onNavigate} />
			</div>

			<Separator />

			<Button
				onClick={logout}
				className="mt-2 rounded-lg lg:rounded-none lg:rounded-r-lg"
				size="lg"
			>
				Log out
			</Button>
		</div>
	)
}