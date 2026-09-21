'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Pencil } from 'lucide-react'

import { Commission } from '@/types/commission'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import DeleteCommissionModal from '@/components/modal/DeleteCommissionModal'

export default function CommissionCard({ commission }: { commission: Commission }) {
	const price = Number(commission.price)
	const commissionRate = Number(commission.commissionRate)
	const commissionAmount = price * (commissionRate / 100)

	return (
		<Card className="group overflow-hidden transition-shadow hover:shadow-md pt-0">
			{commission.imageKey ? (
				<div className="relative aspect-video overflow-hidden bg-muted">
					<Image
						src={`/api/images/${commission.imageKey}`}
						alt={commission.title}
						fill
						sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
						className="object-cover transition-transform duration-300 group-hover:scale-105"
					/>
				</div>
			) : (
				<div className="flex aspect-video items-center justify-center bg-muted">
					<span className="text-sm text-muted-foreground">No image</span>
				</div>
			)}

			<CardHeader className="pb-3">
				<div className="flex items-start justify-between gap-4">
					<div className="min-w-0">
						<h3 className="truncate font-semibold">{commission.title}</h3>
						<p className="mt-1 text-sm text-muted-foreground">
							{new Date(commission.date).toLocaleDateString('en-MY', {
								day: 'numeric',
								month: 'short',
								year: 'numeric',
							})}
						</p>
					</div>

					<p className="shrink-0 font-semibold">
						RM {price.toFixed(2)}
					</p>
				</div>
			</CardHeader>

			<CardContent className="pb-4">
				{commission.notes ? (
					<p className="line-clamp-2 text-sm text-muted-foreground">
						{commission.notes}
					</p>
				) : (
					<p className="text-sm text-muted-foreground">
						No notes
					</p>
				)}

				<div className="mt-4 flex items-center justify-between rounded-lg bg-muted border px-3 py-2.5">
					<div>
						<p className="text-xs text-muted-foreground">Commission</p>
						<p className="font-medium">{commissionRate}%</p>
					</div>

					<div className="text-right">
						<p className="text-xs text-muted-foreground">Earned</p>
						<p className="font-semibold">RM {commissionAmount.toFixed(2)}</p>
					</div>
				</div>
			</CardContent>

			<CardFooter className="justify-end gap-1 border-t bg-muted/20 px-4 py-3">
				<Link href={`/commissions/${commission.id}`} className={`${buttonVariants({ variant: 'ghost' })}`}>
					<Pencil />
				</Link>

				<DeleteCommissionModal id={commission.id} title={commission.title} />
			</CardFooter>
		</Card>
	)
}