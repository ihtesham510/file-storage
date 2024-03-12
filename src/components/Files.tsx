'use client'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardTitle } from './ui/card'
import { useMutation, useQuery } from 'convex/react'
import { api } from '@convex/_generated/api'
import { useOrganization } from '@clerk/nextjs'
import Ctx from './ContextMenu'
import { Button } from './ui/button'
import { Id } from '@convex/_generated/dataModel'
import CreateFile from './CreateFile'

const Files = () => {
	const { organization } = useOrganization()
	const files = useQuery(api.file.getFiles, organization?.id ? { org_id: organization.id } : 'skip')
	const [disable, setDisabled] = useState<boolean>(false)
	const deleteFile = useMutation(api.file.deleteFile)
	const delFile = (id: Id<'files'>) => {
		deleteFile({ id: id })
	}
	useEffect(() => {
		if (!organization) setDisabled(true)
	}, [organization?.id])
	return (
		<>
			{files?.map(file => (
				<Ctx key={file._id} deleteBtnClick={() => delFile(file._id)} disabled={disable}>
					<Card className=' h-72 w-72   border-border'>
						<CardContent className='m-6 flex flex-col justify-evenly gap-5 '>
							<div>
								<CardTitle>{file.name}</CardTitle>
								<CardDescription>{file.filetype}</CardDescription>
							</div>
							<Button variant='destructive' onClick={() => delFile(file._id)} className='mt-16'>
								Delete
							</Button>
						</CardContent>
					</Card>
				</Ctx>
			))}
			<CreateFile />
		</>
	)
}

export default Files
