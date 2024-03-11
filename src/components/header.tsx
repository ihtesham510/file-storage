import { SignedIn, SignOutButton, UserButton, SignedOut, SignInButton } from '@clerk/nextjs'
import React from 'react'
import { Button } from './ui/button'
import ThemeToggle from './ThemeToggle'
import { useTheme } from 'next-themes'

const Header = () => {
	return (
		<div className='flex items-center justify-end gap-5 p-4'>
			<ThemeToggle />
			<SignedIn>
				<UserButton />
			</SignedIn>
			<SignedOut>
				<SignInButton mode='modal'>
					<Button>Sign in</Button>
				</SignInButton>
			</SignedOut>
		</div>
	)
}

export default Header
