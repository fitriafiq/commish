import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/proxy'

export async function proxy(request: NextRequest) {
	const pathname = request.nextUrl.pathname

	const isRegisterDisabled = process.env.DISABLED_REGISTER === 'true'
	const isRegisterRoute = pathname === '/register'

	if (isRegisterDisabled && isRegisterRoute) {
		const url = request.nextUrl.clone()
		url.pathname = '/login'

		return NextResponse.redirect(url)
	}

	return updateSession(request)
}

export const config = {
	matcher: [
		'/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
	],
}