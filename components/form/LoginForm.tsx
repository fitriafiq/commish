'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { login } from '@/actions/authActions'
import { useActionState, useEffect } from 'react'
import { Field } from '@/components/ui/field'
import { toast } from 'sonner'

export default function LoginForm() {
	const [state, formAction, pending] = useActionState(login, null)

	useEffect(() => {
		if (state?.error) {
			toast.error(state.error)
		}
	}, [state])

	return (
		<form action={formAction} className="flex flex-col gap-3">
			<Field>
				<Input name="email" type="text" placeholder="Email" />
			</Field>
			<Field>
				<Input name="password" type="password" placeholder="Password" />
			</Field>

			<Button type="submit" className="w-full" disabled={pending} size="lg">
				{pending ? 'Loading...' : 'Login'}
			</Button>
		</form>
	)
}