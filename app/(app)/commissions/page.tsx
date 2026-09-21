import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { Plus } from 'lucide-react'

import { Commissions } from '@/components/Commissions'
import { createClient } from '@/lib/supabase/server'
import * as commissionService from '@/services/commissionService'
import PageHeader from '@/components/header/PageHeader'

export default async function CommissionsPage() {
	const supabase = await createClient()
	const { data: { user } } = await supabase.auth.getUser()

	if (!user) {
		return null
	}

	const commissions = await commissionService.getCommissions(user.id)

	return (
		<>
			<div className="flex items-center justify-between">
				<PageHeader title="Commissions" description="Manage your commission records."/>

				<Link
					href="/commissions/new"
					className={buttonVariants({
						variant: 'default',
						size: 'lg',
					})}
				>
					<Plus />
					<p className="hidden sm:block">Add New</p>
				</Link>
			</div>

			<Commissions commissions={commissions} />
		</>
	)
}