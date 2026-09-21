import { NextResponse } from 'next/server'
import { getImage } from '@/services/storageService'

export async function GET(_request: Request, { params }: { params: Promise<{ key: string[] }> }) {
	const { key } = await params
	const imageKey = key.join('/')

	try {
		const object = await getImage(imageKey)

		if (!object.Body) {
			return new NextResponse('Image not found', { status: 404 })
		}

		return new NextResponse(object.Body.transformToWebStream(), {
			headers: {
				'Content-Type': object.ContentType ?? 'application/octet-stream',
				'Cache-Control': 'public, max-age=31536000, immutable',
			},
		})
	} catch (error) {
		console.error('Failed to retrieve image:', error)
		return new NextResponse('Image not found', { status: 404 })
	}
}