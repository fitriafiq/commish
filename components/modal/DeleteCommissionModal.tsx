'use client'

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { deleteCommission } from '@/actions/commissionActions'
import { Loader2, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export default function DeleteCommissionModal({
	id,
	title,
}: {
	id: string
	title: string
}) {
	const [open, setOpen] = useState(false)
	const [isDeleting, setIsDeleting] = useState(false)

	async function handleDelete() {
		setIsDeleting(true)

		try {
			const result = await deleteCommission(id)

			if (result.error) {
				toast.error(result.error)
				return
			}

			toast.success(result.success ?? 'Commission deleted successfully.')
			setOpen(false)
		} catch (error) {
			console.error(error)
			toast.error('Failed to delete commission.')
		} finally {
			setIsDeleting(false)
		}
	}

	return (
		<AlertDialog
			open={open}
			onOpenChange={(value) => {
				if (!isDeleting) {
					setOpen(value)
				}
			}}
		>
			<AlertDialogTrigger className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground">
				<Trash2 className="size-4" />
			</AlertDialogTrigger>

			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Delete commission?</AlertDialogTitle>

					<AlertDialogDescription>
						Are you sure you want to delete "{title}"? This action cannot be undone.
					</AlertDialogDescription>
				</AlertDialogHeader>

				<AlertDialogFooter>
					<AlertDialogCancel disabled={isDeleting}>
						Cancel
					</AlertDialogCancel>

					<AlertDialogAction
						onClick={(event) => {
							event.preventDefault()
							handleDelete()
						}}
						disabled={isDeleting}
						className="bg-destructive text-destructive-foreground hover:bg-destructive/90 text-white"
					>
						{isDeleting ? 'Deleting...' : 'Delete'}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}