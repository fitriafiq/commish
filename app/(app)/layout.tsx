import MobileNavigation from '@/components/layout/MobileNavigation'
import Sidebar from '@/components/layout/Sidebar'

export default function AppLayout({ children, }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen bg-slate-100">
			<MobileNavigation />

			<div className="grid min-h-screen lg:grid-cols-[240px_1fr]">
				<aside className="hidden bg-slate-100 lg:block">
					<div className="sticky top-0 h-screen py-6">
						<Sidebar />
					</div>
				</aside>

				<main className="min-w-0">
					<div className="p-3 sm:p-5 lg:p-7">
						<div className="min-h-[calc(100vh-1.5rem)] rounded-xl border border-gray-300 bg-white p-4 sm:p-6">
							{children}
						</div>
					</div>
				</main>
			</div>
		</div>
	)
}