import { Commission } from '@/types/commission'

export function calculateCommissionStats(commissions: Commission[]) {
	const totalItems = commissions.length

	const totalSales = commissions.reduce((total, commission) => {
		return total + Number(commission.price)
	}, 0)

	const totalCommission = commissions.reduce((total, commission) => {
		const price = Number(commission.price)
		const rate = Number(commission.commissionRate)

		return total + price * (rate / 100)
	}, 0)

	return {
		totalItems,
		totalSales,
		totalCommission
	}
}