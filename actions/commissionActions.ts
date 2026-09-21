'use server'

import { ActionState } from '@/types/action'
import * as commissionService from '@/services/commissionService'
import { CommissionForm } from '@/types/commission'
import * as storageService from '@/services/storageService'
import * as authService from '@/services/authService'
import { revalidatePath } from 'next/cache'

export async function createCommission(_previousState: ActionState, formData: FormData): Promise<ActionState> {
	const user = await authService.getCurrentUser()

	if (!user) {
		return {
			error: 'You must be logged in.',
		}
	}

	const title = formData.get('title')?.toString()
	const date = formData.get('date')?.toString()
	const priceValue = formData.get('price')?.toString()
	const commissionRateValue = formData.get('commissionRate')?.toString()
	const notes = formData.get('notes')?.toString()
	const image = formData.get('image')

	const price = Number(priceValue)
	const commissionRate = Number(commissionRateValue)

	if (!title || !date || !priceValue || !commissionRateValue || !Number.isFinite(price) || !Number.isFinite(commissionRate)) {
		return {
			error: 'Please fill in all required fields.',
		}
	}

	let imageKey: string | undefined

	if (image instanceof File && image.size > 0) {
		imageKey = await storageService.uploadImage(
			`commissions/${user.id}/${crypto.randomUUID()}-${image.name}`,
			image
		)
	}

	const data: CommissionForm = {
		title,
		date,
		price,
		commissionRate,
		notes,
		imageKey
	}

	try {
		await commissionService.createCommission(user.id, data)
	} catch (error) {
		console.error(error)

		return {
			error: 'Failed to create commission.',
		}
	}

	return {
		success: 'Commission created.'
	}
}

export async function deleteCommission(id: string) {
	const user = await authService.getCurrentUser()

	if (!user) {
		return {
			error: 'You must be logged in.',
		}
	}

	try {
		await commissionService.deleteCommission(user.id, id)
		revalidatePath('/commissions')

		return { success: 'Commission deleted.' }
	} catch (error) {
		console.error(error)
		return { error: 'Failed to delete commission.' }
	}
}


export async function updateCommission(_previousState: ActionState, formData: FormData): Promise<ActionState> {
	const user = await authService.getCurrentUser()

	if (!user) {
		return {
			error: 'You must be logged in.',
		}
	}

	const id = formData.get('id')?.toString()
	const title = formData.get('title')?.toString()
	const date = formData.get('date')?.toString()
	const priceValue = formData.get('price')?.toString()
	const commissionRateValue = formData.get('commissionRate')?.toString()
	const notes = formData.get('notes')?.toString()
	const image = formData.get('image')
	const currentImageKey = formData.get('imageKey')?.toString()
	const price = Number(priceValue)
	const commissionRate = Number(commissionRateValue)

	if (!id || !title || !date || !priceValue || !commissionRateValue || !Number.isFinite(price) || !Number.isFinite(commissionRate)) {
		return {
			error: 'Please fill in all required fields.' + id,
		}
	}

	let imageKey = currentImageKey

	try {
		if (image instanceof File && image.size > 0) {
			imageKey = await storageService.uploadImage(
				`commissions/${user.id}/${crypto.randomUUID()}-${image.name}`,
				image
			)
		}

		const data: CommissionForm = {
			title,
			date,
			price,
			commissionRate,
			notes,
			imageKey,
		}

		const commission = await commissionService.updateCommission(user.id, id, data)

		if (!commission) {
			return {
				error: 'Commission not found.',
			}
		}

		if (currentImageKey && imageKey !== currentImageKey) {
			await storageService.deleteImage(currentImageKey)
		}

		return {
			success: 'Commission updated.',
		}
	} catch (error) {
		console.error('Update commission error:', error)

		return {
			error: 'Failed to update commission.',
		}
	}
}