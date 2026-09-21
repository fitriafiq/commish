import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { Commission } from '@/types/commission'
import { buttonVariants } from '@/components/ui/button'

export default function CommissionList({ commissions, }: { commissions: Commission[] }) {
	const recentCommissions = commissions.slice(0, 5)

	return (
		<div className="mt-8">
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-lg font-semibold">Recent commissions</h2>
					<p className="text-sm text-muted-foreground">
						Your latest commission records.
					</p>
				</div>

				<Link
					href="/commissions"
					className={buttonVariants({
						variant: 'ghost',
						size: 'sm',
					})}
				>
					View all
					<ArrowRight />
				</Link>
			</div>

			<div className="mt-3 overflow-hidden rounded-xl border bg-card">
				{recentCommissions.length > 0 ? (
					<div className="divide-y">
						{recentCommissions.map((commission) => {
							const price = Number(commission.price)
							const rate = Number(commission.commissionRate)
							const earned = price * (rate / 100)

							return (
								<Link
									key={commission.id}
									href={`/commissions/${commission.id}`}
									className="flex items-center gap-4 p-4 transition-colors hover:bg-muted/50"
								>
									<div className="min-w-0 flex-1">
										<p className="truncate font-medium">
											{commission.title}
										</p>

										<p className="mt-1 text-sm text-muted-foreground">
											{new Date(commission.date).toLocaleDateString('en-MY', {
												day: 'numeric',
												month: 'short',
												year: 'numeric',
											})}
										</p>
									</div>

									<div className="text-right">
										<p className="font-medium">
											RM {price.toFixed(2)}
										</p>

										<p className="mt-1 text-sm text-muted-foreground">
											RM {earned.toFixed(2)} earned
										</p>
									</div>
								</Link>
							)
						})}
					</div>
				) : (
					<div className="py-10 text-center">
						<p className="text-sm text-muted-foreground">
							No commissions yet.
						</p>

						<Link
							href="/commissions/new"
							className={buttonVariants({
								variant: 'link',
								size: 'sm',
							})}
						>
							Add your first commission
						</Link>
					</div>
				)}
			</div>
		</div>
	)
}