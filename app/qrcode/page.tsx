import { permanentRedirect } from 'next/navigation'

export const metadata = {
	title: 'Связаться с нами',
}

export default async function Page() {
	
  	return (
		permanentRedirect('https://wa.me/79183330100')
  	)
}