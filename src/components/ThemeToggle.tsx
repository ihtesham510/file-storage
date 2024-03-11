'use client'

import * as React from 'react'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'

export default function ThemeToggle() {
	const { theme, setTheme } = useTheme()
	const handleClick = () => {
		setTheme(theme === 'dark' ? 'light' : 'dark')
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
