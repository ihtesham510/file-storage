import { SignedIn, UserButton, SignedOut, SignInButton, OrganizationSwitcher } from '@clerk/nextjs'
import React from 'react'
import { Button } from './ui/button'
import ThemeToggle from './ThemeToggle'

const Header = () => {
	return (
		<div className='flex items-center justify-end gap-5 p-4'>
			<SignedIn>
				<OrganizationSwitcher appearance={{ elements: 'text-black dark:text-white' }} />
				<UserButton />
			</SignedIn>
			<SignedOut>
				<SignInButton mode='modal'>
					<Button>Sign in</Button>
				</SignInButton>
			</SignedOut>
			<ThemeToggle />
		</div>
	)
}

export default Header
