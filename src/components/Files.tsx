'use client'
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardTitle } from './ui/card'
import { useMutation, useQuery } from 'convex/react'
import { api } from '@convex/_generated/api'
import { useOrganization } from '@clerk/nextjs'
import Ctx from './ContextMenu'
import { Button } from './ui/button'
import CreateFile from './CreateFile'
import ConfirmDialog from './ConfirmDialog'
import FilesSkeleton from './FilesSkeleton'
import { toast } from './ui/use-toast'

const Files = () => {
	const { organization } = useOrganization()
	const files = useQuery(api.file.getFiles, organization?.id ? { org_id: organization.id } : 'skip')
	const [disable, setDisabled] = useState<boolean>(false)
	const deleteFile = useMutation(api.file.deleteFile)
	if (!files) return <FilesSkeleton />
	return (
		<>
			{files?.map(file => (
				<Ctx key={file._id} disabled={disable} file={file}>
					<Card className=' h-72 w-72   border-border'>
						<CardContent className='m-6 flex flex-col justify-evenly gap-5 '>
							<div>
								<CardTitle className='overflow-hidden text-ellipsis whitespace-nowrap'>{file.name}</CardTitle>
								<CardDescription>{file.filetype}</CardDescription>
							</div>
							<ConfirmDialog
								onConfirm={() => {
									deleteFile({ id: file._id, stroageId: file.storageId })
									toast({
										variant: 'default',
										title: 'Deleted Successfully',
									})
								}}
							>
								<Button variant='destructive' className='mt-16'>
									Delete
								</Button>
							</ConfirmDialog>
						</CardContent>
					</Card>
				</Ctx>
			))}
			<CreateFile />
		</>
	)
}

export default Files
