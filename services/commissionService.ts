import { db } from '@/lib/db'
import { commissions } from '@/lib/schema'
import { eq, and } from 'drizzle-orm'
import { Commission, CommissionForm } from '@/types/commission'
import { deleteImage } from '@/services/storageService'

export async function createCommission(userId: string, data: CommissionForm) {
	const [commission] = await db
		.insert(commissions)
		.values({
			userId,
			title: data.title,
			date: data.date,
			price: data.price.toString(),
			commissionRate: data.commissionRate.toString(),
			notes: data.notes,
			imageKey: data.imageKey,
		})
		.returning()

	return commission
}

export async function getCommission(userId: string, id: string): Promise<Commission> {
	const [commission] = await db
		.select()
		.from(commissions)
		.where(
			and(
				eq(commissions.id, id),
				eq(commissions.userId, userId)
			)
		)

	return commission
}

export async function getCommissions(userId: string): Promise<Commission[]> {
	return await db
		.select()
		.from(commissions)
		.where(
			eq(commissions.userId, userId),
		)
}

export async function updateCommission(userId: string, id: string, data: CommissionForm) {
	const [commission] = await db
		.update(commissions)
		.set({
			title: data.title,
			date: data.date,
			price: data.price.toString(),
			commissionRate: data.commissionRate.toString(),
			notes: data.notes,
			imageKey: data.imageKey,
			updatedAt: new Date(),
		})
		.where(
			and(
				eq(commissions.id, id),
				eq(commissions.userId, userId)
			)
		)
		.returning()

	return commission
}

export async function deleteCommission(userId: string, id: string) {
	const [commission] = await db.delete(commissions)
		.where(
			and(
				eq(commissions.id, id),
				eq(commissions.userId, userId)
			)
		)
		.returning({
			imageKey: commissions.imageKey
		})

	if (commission?.imageKey) {
		await deleteImage(commission.imageKey)
	}

	return commission
}