import Container from "#/components/ui/container";
import AccountNav from "#/components/account/account-nav";
import { redirect } from 'next/navigation'
import { loggedIn } from '#/lib';

export const metadata = {
	title: 'Личный кабинет ilMonte',
}

export default async function AccountLayout({ children }:any) {
	const isLogedIn = await loggedIn();
	
	return (
		<>
			{isLogedIn ? <Container>
				<div className="py-16 lg:py-20 px-0 xl:max-w-screen-xl mx-auto flex  md:flex-row w-full">
				<div className="flex flex-col md:flex-row w-full">
					<AccountNav />
					<div className="md:w-4/6 2xl:w-8/12 mt-4 md:mt-0">{children}</div>
				</div>
				</div>
			</Container> : redirect('/')
			}
		</>
  );
}