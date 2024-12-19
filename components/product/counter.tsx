"use client"
import MinusIcon from "#/components/icons/minus-icon";
import PlusIcon from "#/components/icons/plus-icon";
import Button from "#/components/ui/button";
import clsx from "clsx";
import toast from 'react-hot-toast';
import LoadingDots from '../loading-dots';
import { useRouter } from 'next/navigation';
import { startTransition, useState } from 'react';

export default function Counter({
	item,
	variant = "default",
}: any) {
	const isSelected = true;
	const size = variant !== "dark" ? "12px" : "10px";
	const router = useRouter();
	const [editing, setEditing] = useState(false);
	const [count, setCount] = useState(1);

	async function addToCart() {
		setEditing(true);

		const response = await fetch(`/api/cart`, {
			method: 'POST',
			body: JSON.stringify({
				product_id: item.product_id,
				cart_id: item.cart_id,
				quantity: count
			})
		});

		const data = await response.json();

		if (data.error) {
			alert(data.error);
			return;
		}

		startTransition(() => {
			router.refresh();
			toast.success("Добавлен в корзину", {
				duration: 4000,
				position:"top-center",
			});
			setEditing(false);
		});
	}

	const handleEdit = (type:string) => {
		type == 'minus' && count != 1 ? setCount(count - 1) : type == 'plus' ? setCount(count + 1) : null;
	}

	return (
		<>
			<div
				className={clsx(
					"group flex items-center justify-between rounded-md overflow-hidden flex-shrink-0",
					{
						"border h-11 md:h-12 border-gray-300": variant === "default",
						"h-8 md:h-9 shadow-navigation bg-heading": variant === "dark",
					}
				)}
			>


				<button
					onClick={() => handleEdit('minus')}
					className={clsx(
						"flex items-center justify-center flex-shrink-0 h-full transition ease-in-out duration-300 focus:outline-none",
						{
							"w-10 md:w-12 text-heading border-e border-gray-300 hover:text-white hover:bg-heading":
								variant === "default",
							"w-8 md:w-9 text-white bg-heading hover:bg-gray-600 focus:outline-none":
								variant === "dark",
						}
					)}
					disabled={editing}
				>
					<MinusIcon width={size} />
				</button>

				{editing ?
					(<LoadingDots className="bg-black dark:bg-white" />) :
					(<span
						className={clsx(
							"font-semibold flex items-center justify-center h-full  transition-colors duration-250 ease-in-out cursor-default flex-shrink-0",
							{
								"text-base text-heading w-12  md:w-20 xl:w-24":
									variant === "default",
								"text-sm text-white w-8 md:w-10 ": variant === "dark",
							}
						)}
					>
						{count}
					</span>)}

				<button
					onClick={() => handleEdit('plus')}
					className={clsx(
						"flex items-center justify-center h-full flex-shrink-0 transition ease-in-out duration-300 focus:outline-none",
						{
							"w-10 md:w-12 text-heading border-s border-gray-300 hover:text-white hover:bg-heading":
								variant === "default",
							"w-8 md:w-9 text-white bg-heading hover:bg-gray-600 focus:outline-none":
								variant === "dark",
						}
					)}
					disabled={editing}
				>
					<PlusIcon width={size} height={size} />
				</button>
			</div>
			<Button
				onClick={addToCart}
				variant="slim"
				className={`w-full md:w-6/12 xl:w-full ${!isSelected && "bg-gray-400 hover:bg-gray-400"}`}
				disabled={editing}
				loading={editing}
				title="В корзину"
			>
				<span className="py-2 3xl:px-8">В корзину</span>
			</Button>
		</>
	)
}