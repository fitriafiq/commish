import { NextResponse, NextRequest } from 'next/server'
import { generateCommissionPdf } from '@/lib/pdf/commission-pdf'
import { createClient } from '@/lib/supabase/server'
import * as commissionService from '@/services/commissionService'

export async function GET(request: NextRequest) {
	const month = request.nextUrl.searchParams.get('month')
	const supabase = await createClient()

	console.log(month)

	const { data: { user } } = await supabase.auth.getUser()

	if (!user) {
		return new NextResponse('Unauthorized', {
			status: 401,
		})
	}

	const commissions = await commissionService.getCommissions(
		user.id,
		month ?? undefined
	)

	const pdf = await generateCommissionPdf(
		commissions,
		month ?? undefined
	)

	return new NextResponse(new Uint8Array(pdf), {
		headers: {
			'Content-Type': 'application/pdf',
			'Content-Disposition': `attachment; filename="commissions-${month}.pdf"`,
		},
	})
}