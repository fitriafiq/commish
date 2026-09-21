import { Stat } from '@/types/stat'

export default function StatCard({ label, item, icon: Icon }: Stat) {
	return (
		<div className="rounded-xl border bg-card p-4">
			<div className="flex items-center gap-2 text-sm text-muted-foreground">
				<Icon className="size-4" />
				<span>{label}</span>
			</div>

			<p className="mt-2 text-2xl font-semibold">
				{item}
			</p>
		</div>
	)
}