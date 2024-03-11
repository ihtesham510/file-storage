import { Button } from '@/components/ui/button'
import { SignInButton, SignOutButton, SignedIn, SignedOut } from '@clerk/nextjs'

export default function Home() {
	return (
		<main className='flex min-h-screen flex-col items-center justify-between p-24'>
			<SignedIn>
				<SignOutButton>
					<Button>Sign out</Button>
				</SignOutButton>
			</SignedIn>
			<SignedOut>
				<SignInButton mode='modal'>
					<Button>Sign in</Button>
				</SignInButton>
			</SignedOut>
			<Button>hellow world</Button>
		</main>
	)
}
