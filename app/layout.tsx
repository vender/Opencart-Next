import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '#/components/navbar';
import { getCategories, getInformations } from '#/lib'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Open React",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const categories = await getCategories(0);
  const infoPages = await getInformations();

  return (
    <html lang="ru">
      <head />
      <body>
        <div className='flex flex-col min-h-screen'>
          <Navbar categories={categories} infoPages={infoPages} />
          <main className='relative flex-grow'>{children}</main>
        </div>
      </body>
    </html>
  )
}