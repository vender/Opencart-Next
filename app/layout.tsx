import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '#/components/navbar';
import Footer from '#/components/footer/footer';
import MobileNavigation from "#/components/navbar/mobile-navigation";
import { Toaster } from 'react-hot-toast';
import type { Metadata, ResolvingMetadata } from 'next'
import { getCategories, getInformations, loggedIn, siteInfo, footers } from '#/lib';

const inter = Inter({
  subsets: ['latin', 'cyrillic-ext'],
  display: 'swap',
  variable: '--font-inter',
})

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export const revalidate = 60;

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const siteInfoData = await siteInfo();
  return {
    title: siteInfoData.siteName
  }
}

async function getCategoryPages(categories:any){
  return categories.map((cat:any) => {
    const subCat = cat.categories ? cat.categories : false;
    return cat.top ? {
      id: cat.category_id,
      path: `/category/${cat.category_id}`,
      label: cat.name,
      subMenu: subCat.length ? subCat.map((subCat:any) =>{
        return {
          id: subCat.category_id,
          path: `/category/${subCat.category_id}`,
          label: subCat.name,
        }
      }).filter((item:any) => item) : false
    } : null
  }).filter((item:any) => item)
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const categories = await getCategories(0);
  let infoPages = await getInformations();
  const subMenu = await getCategoryPages(categories);
  const isLogedIn = await loggedIn();
  const siteInfoData = await siteInfo();
  const footer_data = await footers();

  const infoPagesFiltered = infoPages.map((infoPage:any) =>{
    return infoPage.top_menu && {
      id: infoPage.information_id,
      path: `/info/${infoPage.information_id}`,
      label: infoPage.title,
    }
  }).filter((item:any) => item);

  const mainMenu = {
    menu: [
      {
        id: 0,
        path: "/",
        label: "Каталог",
        subMenu: subMenu
      },
      ...infoPagesFiltered
    ]
  }

  return (
    <html lang="ru" className={`${inter.variable}`}>
      <head />
      <body>
        <div className='flex flex-col min-h-screen'>
          <Navbar mainMenu={mainMenu} infoPages={infoPages} isLogedIn={isLogedIn} siteInfo={siteInfoData} />
          <main className='relative flex-grow'>{children}</main>
          <Footer infoPages={infoPages} widgets={footer_data}/>
          <MobileNavigation mainMenu={mainMenu} infoPages={infoPages} isLogedIn={isLogedIn} siteInfo={siteInfoData} />
        </div>
        <Toaster />
      </body>
    </html>
  )
}
