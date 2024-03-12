import Header from '@/components/header'
import Files from '@/components/Files'
export default function Home() {
	return (
		<main>
			<Header />
			<div className='m-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4'>
				<Files />
			</div>
		</main>
	)
}
