'use Client'
import React, { useState } from 'react'
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
import { AlertDialogProps } from '@/lib/types'
import { useOutsideClick } from '@/Hooks/useOutSideClick'
const ConfirmDialog: React.FC<AlertDialogProps> = ({ children, title, description, onConfirm }) => {
	const [open, setOpen] = useState<boolean>(false)
	const ref = useOutsideClick(() => {
		setOpen(false)
	})
	const handleConfirm = () => {
		onConfirm()
		setOpen(false)
	}
	return (
		<div ref={ref}>
			<AlertDialog open={open} onOpenChange={e => setOpen(e)}>
				<AlertDialogTrigger>{children}</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle> {title || 'you absolutely sure?'}</AlertDialogTitle>
						<AlertDialogDescription>
							{description || 'This action cannot be undone. This will permanently delete your data from our servers.'}
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction onClick={handleConfirm}>Confirm</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	)
}

export default ConfirmDialog
