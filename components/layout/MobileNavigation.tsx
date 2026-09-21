'use client'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import Sidebar from '@/components/layout/Sidebar'
import { Menu } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

export default function MobileNavigation() {
	const [open, setOpen] = useState(false)

	return (
		<header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-gray-300 bg-white px-4 lg:hidden">
			<div className="font-semibold">
				<Image src="/logo.png" alt="Commish Logo" width={140} height={24} />
			</div>

			<Sheet open={open} onOpenChange={setOpen}>
				<SheetTrigger
					render={
						<Button variant="ghost" size="icon">
							<Menu />
							<span className="sr-only">Open navigation</span>
						</Button>
					}
				/>

				<SheetContent side="right" className="w-72 bg-slate-100 p-4">
					<div className="mt-4 h-[calc(100%-4rem)]">
						<Sidebar onNavigate={() => setOpen(false)} />
					</div>
				</SheetContent>
			</Sheet>
		</header>
	)
}