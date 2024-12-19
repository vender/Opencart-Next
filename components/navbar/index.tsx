import { Suspense } from 'react';
import Cart from '#/components/cart';
import CartIcon from '#/components/icons/cart';
// import SearchIcon from "#/components/icons/search-icon";
import Logo from "#/components/ui/logo";
import HeaderMenu from "#/components/navbar/header-menu";
import AuthMenu from './auth-menu';
import SearchBox from './search-box';

export default async function Navbar({mainMenu, isLogedIn, siteInfo}:any) {

  return (
    <header
      id="siteHeader"
      className="w-full h-16 sm:h-20 lg:h-24 relative z-20"
    >
      <div className="innerSticky text-gray-700 body-font fixed bg-white w-full h-16 sm:h-20 lg:h-24 z-20 ps-4 md:ps-0 lg:ps-6 pe-4 lg:pe-6 transition duration-200 ease-in-out">
        <div className="flex items-center justify-center mx-auto max-w-[1920px] h-full w-full">

          <Logo className='inline-flex focus:outline-none' siteInfo={siteInfo} width={110} height={50} />

          <HeaderMenu
            menu={mainMenu.menu}
            className="hidden lg:flex md:ms-6 xl:ms-10"
          />

          <div className="items-center justify-end flex-shrink-0 hidden lg:flex gap-x-6 lg:gap-x-5 xl:gap-x-8 2xl:gap-x-10 ltr:ml-auto rtl:mr-auto">
            <SearchBox />
            <div className="-mt-0.5 flex-shrink-0">
              <AuthMenu
                isAuthorized={isLogedIn ? true: false}
                className="text-sm xl:text-base text-heading font-semibold"
                btnProps={{
                  className:
                    "text-sm xl:text-base text-heading font-semibold focus:outline-none",
                  children: "Аккаунт",
                }}
              >
                Войти
              </AuthMenu>
            </div>
            <Suspense fallback={<CartIcon />}>
              <Cart />
            </Suspense>
          </div>

        </div>

      </div>

    </header>
  );
}