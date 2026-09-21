import CommissionForm from '@/components/form/CommissionForm'
import { createClient } from '@/lib/supabase/server'
import * as commissionService from '@/services/commissionService'

export default async function EditCommissionPage({ params, }: { params: Promise<{ id: string }> }) {
	const { id } = await params

	const supabase = await createClient()
	const { data: { user } } = await supabase.auth.getUser()

	if (!user) {
		return null
	}

	const commission = await commissionService.getCommission(user.id, id)

	if (!commission) {
		return <div>Commission not found.</div>
	}

	return (
		<div>
			<h1 className="text-2xl font-bold">Edit Commission</h1>
			<CommissionForm commission={commission} />
		</div>
	)
}