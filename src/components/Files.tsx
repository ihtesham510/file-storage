'use client'
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardTitle } from './ui/card'
import { useMutation, useQuery } from 'convex/react'
import { api } from '@convex/_generated/api'
import { useOrganization } from '@clerk/nextjs'
import Ctx from './ContextMenu'
import { Button } from './ui/button'
import CreateFile from './CreateFile'

const Files = () => {
	const { organization } = useOrganization()
	const files = useQuery(api.file.getFiles, organization?.id ? { org_id: organization.id } : 'skip')
	const [disable, setDisabled] = useState<boolean>(false)
	const deleteFile = useMutation(api.file.deleteFile)
	return (
		<>
			{files?.map(file => (
				<Ctx key={file._id} disabled={disable} file={file}>
					<Card className=' h-72 w-72   border-border'>
						<CardContent className='m-6 flex flex-col justify-evenly gap-5 '>
							<div>
								<CardTitle>{file.name}</CardTitle>
								<CardDescription>{file.filetype}</CardDescription>
							</div>
							<Button variant='destructive' onClick={() => deleteFile({ id: file._id })} className='mt-16'>
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
