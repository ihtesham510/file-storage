'use client'
import * as React from 'react'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Skeleton } from './ui/skeleton'

export default function ThemeToggle() {
	const { theme, setTheme } = useTheme()
	const [isMounted, setIsMounted] = React.useState<boolean>(false)
	const handleClick = () => {
		setTheme(theme === 'dark' ? 'light' : 'dark')
	}
	React.useEffect(() => {
		setIsMounted(true)
	}, [])
	if (!isMounted) {
		return <Skeleton className='h-[1.5rem] w-[1.5rem] px-4 py-4' />
	}
	return (
		<Button variant='outline' onClick={handleClick} size='icon'>
			{theme == 'light' && (
				<SunIcon className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
			)}
			<MoonIcon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
			{theme == 'dark' && (
				<MoonIcon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
			)}
			<span className='sr-only'>Toggle theme</span>
		</Button>
	)
}
