'use client'
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuRadioGroup,
	ContextMenuRadioItem,
	ContextMenuSeparator,
	ContextMenuSub,
	ContextMenuSubContent,
	ContextMenuSubTrigger,
	ContextMenuTrigger,
} from '@/components/ui/context-menu'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useMutation } from 'convex/react'
import { api } from '@convex/_generated/api'
import { CtxProps } from '@/lib/types'

const Ctx: React.FC<CtxProps> = ({ children, disabled, file }) => {
	const [view, setView] = useState<'grid' | 'table'>('grid')
	const [isopen, setIsOpen] = useState<boolean>(false)
	const [name, setName] = useState(file.name || '')
	const deleteFile = useMutation(api.file.deleteFile)
	const renameFile = useMutation(api.file.renameFile)
	const handleRename = () => {
		renameFile({ user_id: file._id, name: name })
		setIsOpen(false)
	}
	const handleDelete = () => {
		deleteFile({ id: file._id })
	}
	useEffect(() => setName(file.name), [file.name])
	return (
		<Dialog open={isopen} onOpenChange={e => setIsOpen(e)}>
			<ContextMenu>
				<ContextMenuTrigger>{children}</ContextMenuTrigger>
				<ContextMenuContent className='w-64'>
					<DialogTrigger asChild>
						<ContextMenuItem inset disabled={disabled}>
							Rename
						</ContextMenuItem>
					</DialogTrigger>
					<ContextMenuItem inset onClick={handleDelete} disabled={disabled}>
						Delete
					</ContextMenuItem>
					<ContextMenuSeparator />
					{/* sub menu */}
					<ContextMenuSub>
						<ContextMenuSubTrigger inset>View</ContextMenuSubTrigger>
						<ContextMenuSubContent className='w-48'>
							{/* sub content */}
							<ContextMenuRadioGroup value={view}>
								<ContextMenuRadioItem value='grid' onClick={() => setView('grid')}>
									Grid
								</ContextMenuRadioItem>
								<ContextMenuRadioItem value='table' onClick={() => setView('table')}>
									Table
								</ContextMenuRadioItem>
							</ContextMenuRadioGroup>
						</ContextMenuSubContent>
					</ContextMenuSub>
				</ContextMenuContent>
			</ContextMenu>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Rename File</DialogTitle>
				</DialogHeader>
				<div className='grid  py-4'>
					<div className='grid grid-cols-4 items-center gap-4'>
						<Label htmlFor='name input' className='text-right'>
							Name
						</Label>
						<Input
							id='name'
							className='col-span-3'
							onKeyDown={e => {
								if (e.key == 'Enter') {
									handleRename()
								}
							}}
							value={name}
							onChange={e => setName(e.target.value)}
						/>
					</div>
				</div>
				<DialogFooter>
					<Button onClick={handleRename}>Rename</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
export default Ctx
