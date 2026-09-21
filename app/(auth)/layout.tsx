import Image from 'next/image'

export default function AuthLayout({ children, }: { children: React.ReactNode }) {
	return (
		<div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4 py-12">
			<div className="pointer-events-none absolute inset-0 overflow-hidden">
				<div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-primary-200/40 blur-3xl" />
				<div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-primary-100/60 blur-3xl" />
			</div>

			<div className="relative z-10 w-full max-w-md">
				<div className="rounded-3xl border border-slate-200/80 bg-white/95 p-8 shadow-xl shadow-slate-200/50 backdrop-blur-sm sm:p-10">
					<Image src="/logo-alt.png" alt="Commish Alt Logo" width={64} height={64} className="mx-auto mb-6" />

					{children}
				</div>

				<p className="mt-6 text-center text-xs text-slate-400">
					© {new Date().getFullYear()} Commish
				</p>
			</div>
		</div>
	)
}
