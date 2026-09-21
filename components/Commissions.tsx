'use client'

import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import CommissionCard from '@/components/card/CommissionCard'
import { Commission } from '@/types/commission'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Input } from '@/components/ui/input'
import { Field, FieldLabel, FieldContent } from '@/components/ui/field'
import StatCard from '@/components/card/StatCard'
import { Package, Receipt, Wallet } from 'lucide-react'
import { Stat } from '@/types/stat'
import { calculateCommissionStats } from '@/lib/commission'

export function Commissions({ commissions }: { commissions: Commission[] }) {
	const [selectedDate, setSelectedDate] = useState(new Date())
	const [search, setSearch] = useState('')

	const selectedMonth = selectedDate.getMonth()
	const selectedYear = selectedDate.getFullYear()

	const monthlyCommissions = useMemo(() => {
		return commissions.filter((commission) => {
			const date = new Date(commission.date)

			return (
				date.getMonth() === selectedMonth &&
				date.getFullYear() === selectedYear
			)
		})
	}, [commissions, selectedMonth, selectedYear])

	const filteredCommissions = useMemo(() => {
		const query = search.trim().toLowerCase()

		if (!query) {
			return monthlyCommissions
		}

		return monthlyCommissions.filter((commission) =>
			commission.title.toLowerCase().includes(query)
		)
	}, [monthlyCommissions, search])

	function changeMonth(offset: number) {
		setSelectedDate(
			new Date(selectedYear, selectedMonth + offset, 1)
		)
	}

	const { totalItems, totalSales, totalCommission } = calculateCommissionStats(monthlyCommissions)

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
			label: 'Commission earned',
			item: `RM ${totalCommission.toFixed(2)}`,
			icon: Wallet
		}
	]

	return (
		<div className="mt-6 space-y-4">
			<div className="flex items-center gap-1">
				<Button variant="outline" size="icon" onClick={() => changeMonth(-1)} aria-label="Previous month">
					<ChevronLeft />
				</Button>

				<Popover>
					<PopoverTrigger className="h-9 w-full rounded-md border bg-gray-50 px-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground">
						{selectedDate.toLocaleDateString('en-MY', {
							month: 'long',
							year: 'numeric',
						})}
					</PopoverTrigger>

					<PopoverContent className="w-auto p-0" align="center">
						<Calendar mode="single" selected={selectedDate} defaultMonth={selectedDate}
							onSelect={(date) => {
								if (date) {
									setSelectedDate(date)
								}
							}} />
					</PopoverContent>
				</Popover>

				<Button variant="outline" size="icon" onClick={() => changeMonth(1)} aria-label="Next month">
					<ChevronRight />
				</Button>
			</div>

			<div className="mb-6 grid gap-3 sm:grid-cols-3">
				{stats.map((stat) => (
					<StatCard key={stat.id} {...stat} />
				))}
			</div>

			<Field className="flex-1">
				<FieldLabel htmlFor="search">Search</FieldLabel>
				<FieldContent>
					<Input id="search" name="search" type="text" placeholder="Search commissions..." value={search}
						onChange={(e) => setSearch(e.target.value)} />
				</FieldContent>
			</Field>

			{filteredCommissions.length > 0 ? (
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{filteredCommissions.map((commission) => (
						<CommissionCard key={commission.id} commission={commission} />
					))}
				</div>
			) : (
				<div className="rounded-xl border border-dashed py-12 text-center">
					<p className="text-sm text-muted-foreground">
						No commissions {search.length > 0 ? 'found.' : 'for this month.'}
					</p>
				</div>
			)}
		</div>
	)
}