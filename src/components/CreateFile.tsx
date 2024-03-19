'use client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from './ui/card'
import { TypesofFile } from '@/lib/types'
import ToolTip from './ToolTip'
import { useEffect, useState } from 'react'
import uploadFile from '@/lib/uploadFile'
import { formatName, getAllowedFiles, isAllowedFile } from '@/lib/utils'
import { toast } from './ui/use-toast'
import { useOrganization, useUser } from '@clerk/nextjs'
import { useMutation } from 'convex/react'
import { api } from '@convex/_generated/api'

export default function CreateFile() {
	/*
	 *  All Initialization && declarations
	 */
	const [name, setName] = useState<string>('')
	const [fileType, setFileType] = useState<TypesofFile>()
	const [selectedFile, setSelectedFile] = useState<File>()
	const [disabled, setDisabled] = useState<boolean>(true)
	const { user } = useUser()
	const { organization } = useOrganization()
	const generateUploadUrl = useMutation(api.file.generateUploadUrl)
	const [isOpen, setIsOpen] = useState(false)
	const createFile = useMutation(api.file.createFile)
	/*
	 * All useEffects
	 */
	useEffect(() => {
		if (selectedFile) {
			if (!isAllowedFile(selectedFile)) {
				setSelectedFile(undefined)
				toast({
					variant: 'destructive',
					title: 'Invaid File',
					description: 'The file you selected is not "Allowed"',
				})
			} else {
				setName(formatName(selectedFile.name))
				setFileType(getAllowedFiles(selectedFile))
				setDisabled(false)
			}
		}
	}, [selectedFile])

	useEffect(() => {
		setName('')
		setFileType(undefined)
		setSelectedFile(undefined)
		setDisabled(true)
	}, [isOpen])

	/*
	 * handle upload
	 */
	const handleClick = async () => {
		if (selectedFile && fileType && user) {
			setIsOpen(false)
			toast({
				title: 'Uploading',
				description: 'Please wait while you file is uploading',
			})
			const url = await generateUploadUrl()
			const storageId = await uploadFile(selectedFile, url)
			if (!storageId) {
				toast({
					variant: 'destructive',
					title: 'Oops , An Error Occured',
					description: 'Error while Uploading you file',
				})
				return
			}
			createFile({ name: name, filetype: fileType, created_by: user.id, org_id: organization?.id, storageId: storageId })
			toast({
				title: 'Upload Success',
				description: 'Your File is Successfully uploaded to Server',
			})
			setSelectedFile(undefined)
		}
	}
	return (
		<Dialog open={isOpen} onOpenChange={e => setIsOpen(e)}>
			<ToolTip message='Upload File'>
				<DialogTrigger asChild>
					<Card className='flex h-72 w-72 cursor-pointer  items-center justify-center border-[3px] border-dotted '>
						<CardContent>Add File</CardContent>
					</Card>
				</DialogTrigger>
			</ToolTip>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Upload File</DialogTitle>
				</DialogHeader>
				<div className='grid gap-6 py-4'>
					<div className='grid  max-w-sm items-center gap-1.5'>
						<Label htmlFor='name' className='ml-2'>
							File Name
						</Label>
						<Input id='name' className='col-span-3' value={name} onChange={e => setName(e.target.value)} />
					</div>
					<div className='grid  max-w-sm items-center gap-1.5'>
						<Label htmlFor='File Type' className='ml-2'>
							File Type
						</Label>
						<Select value={fileType} onValueChange={value => setFileType(value as TypesofFile)}>
							<SelectTrigger>
								<SelectValue placeholder='Select Type' />
								<SelectContent>
									<SelectItem value='PDF'>PDF</SelectItem>
									<SelectItem value='DOC/DOCX'>Docx</SelectItem>
									<SelectItem value='PNG/JPEG'>PNG</SelectItem>
									<SelectItem value='CSV'>CSV</SelectItem>
									<SelectItem value='TEXT/PLAIN'>PLAIN</SelectItem>
									<SelectItem value='TS'>Typescript</SelectItem>
									<SelectItem value='JS'>Javascript</SelectItem>
									<SelectItem value='JSON'>JSON</SelectItem>
									<SelectItem value='ZIP'>Compressed(ZIP)</SelectItem>
								</SelectContent>
							</SelectTrigger>
						</Select>
					</div>
					<div className='grid  max-w-sm items-center gap-1.5'>
						<Label htmlFor='picture' className='ml-2'>
							File
						</Label>
						<Input id='picture' type='file' onChange={event => setSelectedFile(event.target.files![0])} />
					</div>
				</div>
				<div>
					<h1 className='py-2 text-xl'>Note :</h1>
					<p className=''>The file should be under 15 Megabytes(Mbs)</p>
				</div>
				<DialogFooter>
					<Button onClick={handleClick} disabled={disabled}>
						Upload
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
