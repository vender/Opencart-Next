import Image from "next/image";
import { IoIosCloseCircle } from "react-icons/io";
import Counter from "#/components/cart/counter";
import { useRouter } from 'next/navigation';
import { startTransition, useState } from 'react';
import Link from "next/link";
import clsx from "clsx";

export default function CartItem({ item }: { item: any }) {
	const router = useRouter();
	const [deleting, setDeleting] = useState(false);
	
	async function handleRemove(cart_id: string) {
		setDeleting(true);

		const response = await fetch(`/api/cart?cart_id=${cart_id}`, {
			method: 'GET',
		});

		const data = await response.json();

		if (data.error) {
			alert(data.error);
			return;
		}

		startTransition(() => {
			router.refresh();
			setDeleting(false);
		});
	}

	return (
		<div
			className={clsx(`group w-full h-auto flex justify-start items-center bg-white py-4 md:py-7 border-b border-gray-100 relative last:border-b-0`, {'opacity-30':deleting})}
			title={item?.name}
		>
			<div className="relative flex w-24 md:w-28 h-24 md:h-28 rounded-md overflow-hidden bg-gray-200 flex-shrink-0 cursor-pointer me-4">
				<Image
					src={
						item.image
						? `${process.env.NEXT_PUBLIC_OPENCART_DOMAIN_URL}/image/${item.image}`
						: "/assets/placeholder/products/product-gallery.svg"
					}
					width={112}
					height={112}
					loading="eager"
					alt={item.name || "Фото товара"}
					className="bg-gray-300 object-cover"
				/>
				<div
					className="absolute top-0 start-0 h-full w-full bg-black bg-opacity-30 md:bg-opacity-0 flex justify-center items-center transition duration-200 ease-in-out md:group-hover:bg-opacity-30"
					onClick={() => handleRemove(item.cart_id)}
					role="button"
				>
					<IoIosCloseCircle className="relative text-white text-2xl transform md:scale-0 md:opacity-0 transition duration-300 ease-in-out md:group-hover:scale-100 md:group-hover:opacity-100" />
				</div>
			</div>

			<div className="flex flex-col w-full overflow-hidden">
				<Link
					href={`/product/${item?.product_id}`}
					className="truncate text-sm text-heading mb-1.5 -mt-1"
				>
					{item.name}
				</Link>
				<span className="text-sm text-gray-400 mb-2.5">
					{"за шт."} : &nbsp;
					{item?.price}
				</span>
				<ul>
					{item?.option.map((opt:any) => (
						<li key={opt.product_option_id} className="text-sm text-gray-600 mb-2.5">{opt.name}: {opt.value}</li>
					))}
				</ul>

				<div className="flex items-end justify-between">
					<Counter
						item={item}
						variant="dark"
					/>
					<span className="font-semibold text-sm md:text-base text-heading leading-5">
						{item.total} ₽
					</span>
				</div>
			</div>
		</div>
	)
}