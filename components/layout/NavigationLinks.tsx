'use client'

import Link from "next/link";
import { usePathname } from 'next/navigation'
import { Files, LayoutDashboard, Settings } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'

const menus = [
	{
		title: 'Dashboard',
		href: '/',
		icon: LayoutDashboard,
	},
	{
		title: 'Commissions',
		href: '/commissions',
		icon: Files,
	},
	{
		title: 'Settings',
		href: '/settings',
		icon: Settings,
	},
]

export default function NavigationLinks({ onNavigate }: { onNavigate?: () => void }) {
	const pathname = usePathname()

	return (
		<nav className="grid gap-1">
			{menus.map((menu) => {
				const Icon = menu.icon
				const isActive =
					pathname === menu.href ||
					(menu.href !== '/' && pathname.startsWith(`${menu.href}/`))

				return (
					<Link
						key={menu.href}
						href={menu.href}
						onClick={onNavigate}
						className={[
							buttonVariants({ variant: 'ghost' }),
							'justify-start gap-3 py-5 rounded-lg lg:rounded-none lg:rounded-r-lg ps-4',
							'border transition hover:scale-[1.02]',
							isActive
								? 'bg-white text-black border-gray-300 lg:border-l-0 ring-1 ring-gray-300'
								: 'bg-transparent text-gray-500 border-slate-100 hover:border-gray-300 hover:bg-white',
						].join(' ')}
					>
						<Icon className="size-4" />
						{menu.title}
					</Link>
				)
			})}
		</nav>
	)
}