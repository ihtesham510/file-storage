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
import { MouseEventHandler, useState } from 'react'

interface Props {
	children: React.ReactNode
	deleteBtnClick?: MouseEventHandler
	editBtnClick?: MouseEventHandler
	disabled: boolean
}
const Ctx: React.FC<Props> = ({ children, editBtnClick, disabled, deleteBtnClick }) => {
	const [view, setView] = useState<'grid' | 'table'>('grid')
	return (
		<ContextMenu>
			<ContextMenuTrigger>{children}</ContextMenuTrigger>
			<ContextMenuContent className='w-64'>
				<ContextMenuItem inset onClick={editBtnClick} disabled={disabled}>
					Edit
				</ContextMenuItem>
				<ContextMenuItem inset onClick={deleteBtnClick} disabled={disabled}>
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
	)
}
export default Ctx
