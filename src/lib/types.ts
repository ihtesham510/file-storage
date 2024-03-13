import { Id } from '@convex/_generated/dataModel'

export interface File {
	_id: Id<'files'>
	_creationTime: number
	org_id?: string | undefined
	name: string
	filetype: string
	created_by: string
}

export interface CtxProps {
	children: React.ReactNode
	disabled: boolean
	file: File
}
