'use client'

import { updatePassword } from '@/actions/authActions'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel, FieldContent } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useActionState, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Card, CardContent } from '@/components/ui/card'

export default function UpdatePasswordForm() {
	const [state, formAction, pending] = useActionState(updatePassword, null)

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
		} else if (state?.success) {
			toast.success(state.success)
		}
	}, [state])

	function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
		setSubmitted(true)

		if (password !== confirmPassword) {
			event.preventDefault()
		}
	}

	return (
		<Card className="mt-4">
			<CardContent>
				<form action={formAction} onSubmit={handleSubmit} className="flex flex-col gap-4">
					<Field>
						<FieldLabel htmlFor="password">
							New Password
						</FieldLabel>
						<FieldContent>
							<Input id="password" name="password" type="password" value={password} placeholder="********"
								onChange={(e) => setPassword(e.target.value)} required />
						</FieldContent>
					</Field>

					<Field data-invalid={passwordMismatch}>
						<FieldLabel htmlFor="confirmPassword">
							Confirm Password
						</FieldLabel>
						<FieldContent>
							<Input id="confirmPassword" name="confirmPassword" type="password" value={confirmPassword} placeholder="********"
								onChange={(e) => setConfirmPassword(e.target.value)} aria-invalid={passwordMismatch} required />
						</FieldContent>

						{passwordMismatch && (
							<FieldError>
								Passwords do not match.
							</FieldError>
						)}
					</Field>

					<div className="text-end">
						<Button type="submit" size="lg" className="sm:w-auto w-full" disabled={pending}>
							{pending ? 'Updating...' : 'Update'}
						</Button>
					</div>
				</form>
			</CardContent>
		</Card>
	)
}