'use client'

import { register } from '@/actions/authActions'
import { Button } from '@/components/ui/button'
import { Field, FieldError } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useActionState, useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function RegisterForm() {
	const [state, formAction, pending] = useActionState(register, null)

	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [submitted, setSubmitted] = useState(false)

	const passwordMismatch =
		submitted &&
		password.length > 0 &&
		confirmPassword.length > 0 &&
		password !== confirmPassword

	useEffect(() => {
		if (state?.error) {
			toast.error(state.error)
		}
	}, [state])

	function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
		setSubmitted(true)

		if (password !== confirmPassword) {
			event.preventDefault()
		}
	}

	return (
		<form action={formAction} onSubmit={handleSubmit} className="flex flex-col gap-4">
			<Field>
				<Input id="email" name="email" type="email" placeholder="Email" required />
			</Field>

			<Field>
				<Input id="password" name="password" type="password" value={password} placeholder="Password"
					onChange={(e) => setPassword(e.target.value)} required />
			</Field>

			<Field data-invalid={passwordMismatch}>
				<Input id="confirmPassword" name="confirmPassword" type="password" value={confirmPassword} placeholder="Confirm Password"
					onChange={(e) => setConfirmPassword(e.target.value)} aria-invalid={passwordMismatch} required />

				{passwordMismatch && (
					<FieldError>
						Passwords do not match.
					</FieldError>
				)}
			</Field>

			<Button type="submit" className="w-full" disabled={pending} size="lg">
				{pending ? 'Registering...' : 'Register'}
			</Button>
		</form>
	)
}