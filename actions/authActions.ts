'use server'

import { redirect } from 'next/navigation'
import * as authService from '@/services/authService'
import { ActionState } from '@/types/action'

export async function login(_previousState: ActionState, formData: FormData): Promise<ActionState> {
	const email = formData.get('email')?.toString()
	const password = formData.get('password')?.toString()

	if (!email || !password) {
		return {
			error: 'Email and password are required.'
		}
	}

	try {
		await authService.login(email, password)
	} catch (error) {
		return {
			error: error instanceof Error ? error.message : 'Something went wrong.',
		}
	}

	redirect('/')
}

export async function register(_previousState: ActionState, formData: FormData): Promise<ActionState> {
	const email = formData.get('email')?.toString()
	const password = formData.get('password')?.toString()

	if (!email || !password) {
		return {
			error: 'Email and password are required.',
		}
	}

	try {
		await authService.register(email, password)
	} catch (error) {
		return {
			error: error instanceof Error ? error.message : 'Something went wrong.',
		}
	}

	redirect('/')
}

export async function logout() {
	await authService.logout()

	redirect('/login')
}

export async function updatePassword(_previousState: ActionState, formData: FormData): Promise<ActionState> {
	const password = formData.get('password')?.toString()

	if (!password) {
		return {
			error: 'Password is required.',
		}
	}

	try {
		await authService.updatePassword(password)
	} catch (error) {
		return {
			error: error instanceof Error ? error.message : 'Something went wrong.',
		}
	}

	return {
		success: 'Password updated.',
	}
}
