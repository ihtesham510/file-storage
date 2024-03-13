import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { ToolTipProps } from '@/lib/types'
const ToolTip: React.FC<ToolTipProps> = ({ children, message }) => {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>{children}</TooltipTrigger>
				<TooltipContent className='font-semibold'>
					<p>{message}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}
export default ToolTip
