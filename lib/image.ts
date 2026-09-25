import sharp from 'sharp'

export async function compressImage(file: File) {
	const buffer = Buffer.from(await file.arrayBuffer())

	const compressed = await sharp(buffer)
		.resize({
			width: 1600,
			height: 1600,
			fit: 'inside',
			withoutEnlargement: true,
		})
		.webp({
			quality: 80,
		})
		.toBuffer()

	return compressed
}