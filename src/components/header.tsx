import { SignedIn, UserButton, SignedOut, SignInButton, OrganizationSwitcher } from '@clerk/nextjs'
import React from 'react'
import { Button } from './ui/button'
import ThemeToggle from './ThemeToggle'
import ToolTip from './ToolTip'

const Header = () => {
	return (
		<div className='flex items-center justify-end gap-5 border-b border-border p-4'>
			<SignedIn>
				<ToolTip message='Mange Organizations'>
					<OrganizationSwitcher appearance={{ elements: 'text-black dark:text-white' }} />
				</ToolTip>
				<UserButton />
			</SignedIn>
			<SignedOut>
				<SignInButton mode='modal'>
					<Button>Sign in</Button>
				</SignInButton>
			</SignedOut>
			<ToolTip message='Toggle Theme'>
				<ThemeToggle />
			</ToolTip>
		</div>
	)
}

export default Header
