import { commissions } from '@/lib/schema'

export type Commission = typeof commissions.$inferSelect

export type CommissionForm = {
	title: string
	date: string
	price: number
	commissionRate: number
	notes?: string
	imageKey?: string
}
