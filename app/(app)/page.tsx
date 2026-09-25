import Link from 'next/link'
import { ArrowRight, Plus } from 'lucide-react'

import { createClient } from '@/lib/supabase/server'
import * as commissionService from '@/services/commissionService'
import { Stat } from '@/types/stat'
import { Package, Receipt, Wallet } from 'lucide-react'
import StatCard from '@/components/card/StatCard'
import { calculateCommissionStats } from '@/lib/commission'
import CommissionList from '@/components/list/CommissionList'
import PageHeader from '@/components/header/PageHeader'

export default async function DashboardPage() {
	const supabase = await createClient()
	const { data: { user } } = await supabase.auth.getUser()

	if (!user) {
		return null
	}

	const commissions = await commissionService.getCommissions(user.id)

	const { totalItems, totalSales, totalCommission } = calculateCommissionStats(commissions)

	const stats: Stat[] = [
		{
			id: 'total-items',
			label: 'Total items',
			item: totalItems,
			icon: Package
		},
		{
			id: 'total-sales',
			label: 'Total sales',
			item: `RM ${totalSales.toFixed(2)}`,
			icon: Receipt
		},
		{
			id: 'commission-earned',
			label: 'Total commission earned',
			item: `RM ${totalCommission.toFixed(2)}`,
			icon: Wallet
		}
	]

	return (
		<div>
			<PageHeader title="Welcome to back!" description="Here's an overview of your commissions." />
			
			<div className="mt-6 grid gap-3 sm:grid-cols-3">
				{stats.map((stat) => (
					<StatCard key={stat.id} {...stat} />
				))}
			</div>

			<div className="mt-8">
				<h2 className="text-lg font-semibold">Quick actions</h2>

				<div className="mt-3 grid gap-3 sm:grid-cols-2">
					<Link
						href="/commissions/new"
						className="group rounded-xl border bg-card p-5 transition-colors hover:bg-muted/50"
					>
						<div className="flex items-center gap-3">
							<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
								<Plus className="size-5" />
							</div>

							<div className="flex-1">
								<p className="font-medium">Add commission</p>
								<p className="text-sm text-muted-foreground">
									Record a new commission.
								</p>
							</div>

							<ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
						</div>
					</Link>

					<Link
						href="/commissions"
						className="group rounded-xl border bg-card p-5 transition-colors hover:bg-muted/50"
					>
						<div className="flex items-center gap-3">
							<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
								<ArrowRight className="size-5" />
							</div>

							<div className="flex-1">
								<p className="font-medium">View commissions</p>
								<p className="text-sm text-muted-foreground">
									Browse and manage your records.
								</p>
							</div>

							<ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
						</div>
					</Link>
				</div>
			</div>

			<CommissionList commissions={commissions} />
		</div>
	)
}