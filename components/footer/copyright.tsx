import { siteSettings } from "#/lib/site-settings";
import Image from "next/image";
import Link from "next/link";

interface CopyrightProps {
	id: string | number;
	path?: string;
	name: string;
	image: string;
	width: number;
	height: number;
}

const payment:CopyrightProps[] = [
	{
		id: 1,
		path: "/",
		image: "/assets/images/payment/mastercard.svg",
		name: "payment-master-card",
		width: 34,
		height: 20,
	},
	{
		id: 2,
		path: "/",
		image: "/assets/images/payment/visa.svg",
		name: "payment-visa",
		width: 50,
		height: 20,
	},
	{
		id: 3,
		path: "/",
		image: "/assets/images/payment/mir-logo.svg",
		name: "payment-paypal",
		width: 76,
		height: 20,
	}
];

export default function Copyright() {
	return (
		<div className="border-t border-gray-300 pt-5 pb-16 sm:pb-20 md:pb-5 mb-2 sm:mb-0">
			<div className="flex flex-col-reverse md:flex-row text-center md:justify-between mx-auto max-w-[1920px] px-4 md:px-8 2xl:px-16">
				<p className="text-body text-xs lg:text-sm leading-6">
					Разработка и поддержка &copy; 2023&nbsp;
					<Link
						target="_blank"
						className="font-semibold text-gray-700 transition-colors duration-200 ease-in-out hover:text-body"
						href={siteSettings.author.websiteUrl}
					>
						{siteSettings.author.name}
					</Link>
					&nbsp; Все права защищены
				</p>

				{payment && (
					<ul className="flex-wrap items-center justify-center hidden mx-auto mb-1 md:flex gap-x-4 xs:gap-x-5 lg:gap-x-7 md:mb-0 md:mx-0">
						{payment?.map((item) => (
							<li
								className="mb-2 md:mb-0 transition hover:opacity-80"
								key={`payment-list--key${item.id}`}
							>
								<a href={item.path ? item.path : "/#"} target="_blank">
									<Image
										src={item.image}
										alt={`${item.name}`}
										height={item.height}
										width={item.width}
									/>
								</a>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	)
}