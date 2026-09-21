'use client'

import { useActionState, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { createCommission, updateCommission } from '@/actions/commissionActions'
import { DatePicker } from '@/components/DatePicker'
import { Button, buttonVariants } from '@/components/ui/button'
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import Link from 'next/link'
import { Commission } from '@/types/commission'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { Card, CardContent } from '../ui/card'

export default function CommissionForm({ commission }: { commission?: Commission }) {
	const [state, formAction, pending] = useActionState(!!commission ? updateCommission : createCommission, null)
	const [imagePreview, setImagePreview] = useState<string | null>(commission?.imageKey ? `/api/images/${commission.imageKey}` : null)

	const [form, setForm] = useState({
		title: commission?.title || '',
		date: commission?.date ? new Date(commission.date) : new Date(),
		price: commission?.price || '',
		commissionRate: commission?.commissionRate || '',
		notes: commission?.notes || '',
	})

	useEffect(() => {
		if (state?.error) {
			toast.error(state.error)
		} else if (state?.success) {
			toast.success(state.success)
			redirect('/commissions')
		}
	}, [state])

	const commissionAmount = form.price && form.commissionRate ?
		((Number(form.price) * Number(form.commissionRate)) / 100).toFixed(2) :
		'0.00'

	return (
		<Card className="mt-4">
			<CardContent>
				<form action={formAction} className="space-y-8">
					<section className="space-y-5">
						<FieldGroup>
							<Field>
								<FieldLabel htmlFor="title">Name</FieldLabel>
								<FieldContent>
									<Input id="title" name="title" placeholder="e.g. Chocolate birthday cake" value={form.title} required
										onChange={(e) =>
											setForm((prev) => ({
												...prev,
												title: e.target.value,
											}))
										} />
								</FieldContent>
							</Field>

							<Field>
								<FieldLabel htmlFor="date">Date</FieldLabel>
								<FieldContent>
									<DatePicker value={form.date} onChange={(date) => {
										if (!date) return

										setForm((prev) => ({
											...prev,
											date,
										}))
									}} />

									<input type="hidden" name="date" value={form.date.toISOString().split('T')[0]} />
								</FieldContent>
							</Field>

							<div className="grid gap-5 sm:grid-cols-2">
								<Field>
									<FieldLabel htmlFor="price">
										Price
									</FieldLabel>
									<FieldContent>
										<div className="relative">
											<span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
												RM
											</span>

											<Input id="price" name="price" type="number" placeholder="0.00" step="0.01" min="0" value={form.price}
												className="pl-10" required onChange={(e) =>
													setForm((prev) => ({
														...prev,
														price: e.target.value,
													}))
												} />
										</div>
									</FieldContent>
								</Field>

								<Field>
									<FieldLabel htmlFor="commissionRate">
										Commission Rate
									</FieldLabel>
									<FieldContent>
										<div className="relative">
											<Input id="commissionRate" name="commissionRate" type="number" placeholder="10" step="0.01" min="0" max="100"
												value={form.commissionRate} className="pr-9" required onChange={(e) =>
													setForm((prev) => ({
														...prev,
														commissionRate:
															e.target.value,
													}))
												} />
											<span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
												%
											</span>
										</div>
									</FieldContent>
								</Field>
							</div>

							<div className="rounded-lg bg-muted/50 px-4 py-3">
								<div className="flex items-center justify-between text-sm">
									<span className="text-muted-foreground">
										Commission amount
									</span>

									<span className="font-medium">
										RM {commissionAmount}
									</span>
								</div>
							</div>
						</FieldGroup>

						<div className="border-t" />

						<Field>
							<FieldLabel htmlFor="notes">Notes</FieldLabel>
							<FieldContent>
								<Textarea id="notes" name="notes" placeholder="Add any notes..." rows={4} value={form.notes}
									onChange={(e) =>
										setForm((prev) => ({
											...prev,
											notes: e.target.value,
										}))
									} />
							</FieldContent>
						</Field>

						<Field>
							<FieldLabel htmlFor="image">
								Image
							</FieldLabel>

							<FieldContent>
								<Input id="image" name="image" type="file" accept=".png,.jpg,.jpeg,.webp"
									onChange={(e) => {
										const file = e.target.files?.[0]

										if (!file) {
											setImagePreview(null)
											return
										}

										const allowedTypes = [
											'image/png',
											'image/jpeg',
											'image/webp',
										]

										const maxSize = 5 * 1024 * 1024

										if (!allowedTypes.includes(file.type)) {
											e.target.value = ''
											setImagePreview(null)
											toast.error('Only PNG, JPG, JPEG, and WebP images are allowed.')
											return
										}

										if (file.size > maxSize) {
											e.target.value = ''
											setImagePreview(null)
											toast.error('Image must be smaller than 5 MB.')
											return
										}

										setImagePreview(URL.createObjectURL(file))
									}}
								/>

								<FieldDescription>
									JPG, PNG or WebP. Maximum file size 5MB.
								</FieldDescription>

								{imagePreview && (
									<div className="relative h-80 overflow-hidden rounded-lg border bg-muted/30">
										<Image src={imagePreview} alt="Selected commission" fill className="object-contain" />
									</div>
								)}
							</FieldContent>
						</Field>
					</section>

					<div className="flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-end">
						<Link href="/commissions" className={`${buttonVariants({ variant: 'outline', size: 'lg' })} border-gray-300! sm:w-auto`}>Cancel</Link>

						<Button type="submit" disabled={pending} className="sm:w-auto" size="lg">
							{pending ? 'Saving...' : 'Save Commission'}
						</Button>
					</div>

					{commission?.id && <input type="hidden" name="id" value={commission.id} />}
					{commission?.imageKey && <input type="hidden" name="imageKey" value={commission.imageKey} />}
				</form>
			</CardContent>
		</Card>
	)
}