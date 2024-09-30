import Image from "next/image";
// import { useWindowSize } from 'react-use';
import clsx from "clsx";
import Link, { LinkProps } from "next/link";

const siteUrl = process.env.NEXT_PUBLIC_OPENCART_DOMAIN_URL;

interface BannerProps {
	banner: any;
	variant?: "rounded" | "default";
	effectActive?: boolean;
	className?: string;
	classNameInner?: string;
	href: LinkProps["href"];
}

// function getImage(deviceWidth: number, imgUrl: string) {
// 	if(deviceWidth < 480) {
// 		let imageName = imgUrl.split('/');
// 		const lastEl = imageName[imageName.length - 1].split('.');
// 		imageName[imageName.length - 1] = `${lastEl[0]}_mob.${lastEl[1]}`;
// 		return `${siteUrl}/image/${imageName.join('/')}`;
// 	} else {
// 		return `${siteUrl}/image/${imgUrl}`;
// 	}
// }

export default function BannerCard({
	banner,
	className,
	effectActive = false,
	classNameInner,
	href,
}:BannerProps) {
	// const { width } = useWindowSize();
	// const selectedImage = getImage(width, banner.image);
	// console.log(selectedImage);
	
	return (
		
			<div className={clsx("mx-auto", className)}>
				<Link
					href={href}
					className={clsx(
						"h-full group flex justify-center relative overflow-hidden",
						classNameInner
					)}
				>
					<Image
						src={`${siteUrl}/image/${banner.image}`}
						width={banner.width}
						height={banner.height}
						alt={banner.title}
						quality={100}
						priority={true}
						className="bg-gray-300 w-full rounded"
					/>
					{effectActive && (
						<div className="absolute top-0 -start-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shine" />
					)}
				</Link>
			</div>
		
	)
}