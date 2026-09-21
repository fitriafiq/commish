'use server'

import { r2 } from '@/lib/r2'
import { PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'

export async function uploadImage(key: string, file: File) {
	const buffer = Buffer.from(await file.arrayBuffer())

	await r2.send(
		new PutObjectCommand({
			Bucket: process.env.R2_BUCKET_NAME,
			Key: key,
			Body: buffer,
			ContentType: file.type,
		})
	)

	return key
}

export async function getImage(key: string) {
	return r2.send(
		new GetObjectCommand({
			Bucket: process.env.R2_BUCKET_NAME,
			Key: key,
		}),
	)
}

export async function deleteImage(key: string) {
	return r2.send(new DeleteObjectCommand({
		Bucket: process.env.R2_BUCKET_NAME,
		Key: key,
	}))
}