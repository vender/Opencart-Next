import Link from "next/link";
import clsx from "clsx";
import Image from "next/image";

export default function Logo({className = '', siteInfo, width, height}:{className: string, siteInfo: any, width: number, height: number}) {
  return (
      <Link href="/" aria-label="На главную" className={clsx(className, 'transition-transform hover:scale-105')}>
          <Image src={`${process.env.NEXT_PUBLIC_OPENCART_DOMAIN_URL}/image/${siteInfo?.siteLogo}`} alt="На главную" width={width} height={height} />
      </Link>
  )
}