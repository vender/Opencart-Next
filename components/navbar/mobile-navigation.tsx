import Link from "next/link";
import { Suspense } from 'react';
import SearchIcon from "#/components/icons/search-icon";
import UserIcon from "#/components/icons/user-icon";
import HomeIcon from "#/components/icons/home-icon";
import Cart from '#/components/cart';
import CartIcon from '#/components/icons/cart';
import AuthMenu from "#/components/navbar/auth-menu";
import Mobiledrawer from "#/components/navbar/mobile-menu";

export default async function MobileNavigation({mainMenu, isLogedIn, siteInfo}:any) {

	return (
		<div className="md:hidden fixed z-10 bottom-0 flex items-center justify-between shadow-bottomNavigation text-gray-700 body-font bg-white w-full h-14 sm:h-16 px-4">
			<Mobiledrawer mainMenu={mainMenu} siteInfo={siteInfo} />
			<button
				className="flex items-center justify-center flex-shrink-0 h-auto relative focus:outline-none"
				// onClick={openSearch}
				aria-label="search-button"
			>
				<SearchIcon />
			</button>
			<Link href="/" className="flex-shrink-0">
				<HomeIcon />
			</Link>
			<Suspense fallback={<CartIcon />}>
				<Cart />
			</Suspense>
			<AuthMenu
				isAuthorized={isLogedIn ? true: false}
				className="flex-shrink-0"
				btnProps={{
					className: "flex-shrink-0 focus:outline-none",
					children: <UserIcon />
				}}
			>
				<UserIcon />
			</AuthMenu>
		</div>
	)
}