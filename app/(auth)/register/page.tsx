import Link from 'next/link'
import RegisterForm from '@/components/form/RegisterForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Commish - Register',
	description: 'Commission management app',
}

export default function LoginPage() {
	return (
		<>
			<div className="text-center">
				<h1 className="text-2xl font-bold text-gray-900 mb-3">Create an Account</h1>
				<p className="text-sm text-gray-600">
					Don't have an account?{" "}
					<Link href="/login" className="font-semibold text-primary">Log in</Link>.
				</p>
			</div>

			<div className="space-y-6 mt-8">
				<RegisterForm />
			</div>
		</>
	)
}