'use client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from './ui/card'
import { useState } from 'react'
import { useOrganization, useUser } from '@clerk/nextjs'
import { useMutation } from 'convex/react'
import { api } from '@convex/_generated/api'

export default function CreateFile() {
	const [name, setName] = useState<string>('file no. 1')
	const [fileType, setFileType] = useState<string>('PDF')
	const [isopen, setIsOpen] = useState<boolean>(false)
	const { organization } = useOrganization()
	const { user } = useUser()
	const createFile = useMutation(api.file.createFile)
	const handleClick = () => {
		if (user && organization) {
			createFile({
				name: name,
				filetype: fileType,
				org_id: organization?.id,
				created_by: user.id,
			})
			setIsOpen(false)
		}
	}

	return (
		<Dialog open={isopen} onOpenChange={e => setIsOpen(e)}>
			<DialogTrigger asChild>
				<Card className='flex h-72 w-72 cursor-pointer  items-center justify-center border-[3px] border-dotted '>
					<CardContent>Add File</CardContent>
				</Card>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Edit profile</DialogTitle>
				</DialogHeader>
				<div className='grid gap-4 py-4'>
					<div className='grid grid-cols-4 items-center gap-4'>
						<Label htmlFor='name' className='text-right'>
							Name
						</Label>
						<Input id='name' className='col-span-3' value={name} onChange={e => setName(e.target.value)} />
					</div>
					<div className='grid grid-cols-4 items-center gap-4'>
						<Label htmlFor='File Type' className='text-right'>
							File Type
						</Label>
						<Input id='File Type' value={fileType} onChange={e => setFileType(e.target.value)} className='col-span-3' />
					</div>
				</div>
				<DialogFooter>
					<Button onClick={handleClick}>Create File</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
