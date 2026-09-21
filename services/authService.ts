import { createClient } from '@/lib/supabase/server'

export async function login(email: string, password: string) {
	const supabase = await createClient()

	const { error } = await supabase.auth.signInWithPassword({
		email,
		password
	})

	if (error) {
		throw new Error(error.message)
	}
}

export async function register(email: string, password: string) {
	const supabase = await createClient()

	const { error } = await supabase.auth.signUp({
		email,
		password
	})

	if (error) {
		throw new Error(error.message)
	}
}

export async function logout() {
	const supabase = await createClient()

	const { error } = await supabase.auth.signOut()

	if (error) {
		throw new Error(error.message)
	}
}

export async function getCurrentUser() {
	const supabase = await createClient()

	const { data: { user } } = await supabase.auth.getUser()

	return user
}

export async function updatePassword(password: string) {
	const supabase = await createClient()

	const { error } = await supabase.auth.updateUser({
		password,
	})

	if (error) {
		throw new Error(error.message)
	}
}