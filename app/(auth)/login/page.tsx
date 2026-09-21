import Link from 'next/link'
import LoginForm from '@/components/form/LoginForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Commish - Login',
	description: 'Commission management app',
}

export default function LoginPage() {
	return (
		<>
			<div className="text-center">
				<h1 className="text-2xl font-bold text-gray-900 mb-3">Log in to Commish</h1>

				<p className="text-sm text-gray-600">
					Don't have an account?{" "}
					<Link href="/register" className="font-semibold text-primary">Sign up</Link>.
				</p>
			</div>

			<div className="space-y-6 mt-8">
				<LoginForm />
			</div>
		</>
	)
}