import Image from "next/image";
import Link from "next/link";

interface Props {
	className?: string;
	widget: {
		footer_id?: number;
		name?: string;
		items?: [];
	};
}

interface List {
	title?: string;
	link?: string;
	image?: string;
	sort_order?: any;
	footer_image_id?: string;
	language_id?: string;
}

export default function WidgetLink({ className, widget }:Props) {
	
	return (
		<div className={`${className}`}>
			<h4 className="text-[#999] text-[16px] font-light md:text-base xl:text-lg font-semibold mb-5 2xl:mb-6 3xl:mb-7">
				{`${widget?.name}`}
			</h4>
			<ul className="text-xs lg:text-sm text-body flex flex-col space-y-3 lg:space-y-3.5">
				{widget?.items?.map((list:List, idx:number) => (
					<li
						key={`widget-list--key${idx}`}
						className="flex items-baseline"
					>
						{list?.image && (
							<span className="me-3 relative top-0.5 lg:top-1 text-sm lg:text-base">
								<Image src={`${process.env.NEXT_PUBLIC_OPENCART_DOMAIN_URL}/image/${list?.image}`} alt="" width={16} height={16} />
							</span>
						)}
						<Link href={list?.link ? list.link : "#!"} className="transition-colors duration-200 hover:text-black">
							{`${list?.title}`}
						</Link>
					</li>
				))}
			</ul>
		</div>
	)
}