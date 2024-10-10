import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";

interface Props {
	className?: string;
    active?: number;
	colors: {
		product_id: number;
        name: string;
		color_image: string;
	}[];
}

export default function ProductColors({
	className = "mb-4",
    active,
	colors,
}:Props) {
    
    return (
		<div className={className}>
			<h3 className="text-base md:text-lg text-heading font-semibold mb-2.5 capitalize">
				Цвета
			</h3>
			<ul className="colors flex flex-wrap -me-3">
				{colors?.map(({ product_id, name, color_image }) => (
                    <Link href={`/product/${product_id}`} >
                        <li
                            key={product_id}
                            className={clsx(
                                "cursor-pointer rounded border  w-9 md:w-11 h-9 md:h-11 p-1 mb-2 md:mb-3 me-2 md:me-3 flex justify-center items-center text-heading text-xs md:text-sm uppercase font-semibold transition duration-200 ease-in-out hover:border-black",
                                { "border-black": active == product_id},
                                { "border-gray-100": active != product_id}
                            )}
                        >
                            {product_id == active}
                            <Image src={`${process.env.NEXT_PUBLIC_OPENCART_DOMAIN_URL}/image/${color_image}`} alt="" width={44} height={44} priority className="h-full w-full rounded block"/>
                        
                        </li>
                    </Link>
				))}
			</ul>
		</div>
	);
}
