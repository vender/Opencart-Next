"use client"
import MinusIcon from "#/components/icons/minus-icon";
import PlusIcon from "#/components/icons/plus-icon";
import clsx from "clsx";
// import Button from "#/components/ui/button";
// import toast from 'react-hot-toast';
// import LoadingDots from '../loading-dots';
// import { useRouter } from 'next/navigation';
// import { startTransition, useState } from 'react';

export default function Counter({
	variant = "default",
	register,
	count,
	setCount,
	handleEdit
}: any) {
	const size = variant !== "dark" ? "12px" : "10px";
	
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


				<span
					onClick={() => handleEdit('minus')}
					className={clsx(
						"flex items-center justify-center flex-shrink-0 h-full transition ease-in-out duration-300 focus:outline-none cursor-pointer",
						{
							"w-10 md:w-12 text-heading border-e border-gray-300 hover:text-white hover:bg-heading":
								variant === "default",
							"w-8 md:w-9 text-white bg-heading hover:bg-gray-600 focus:outline-none":
								variant === "dark",
						}
					)}
				>
					<MinusIcon width={size} />
				</span>

				<input
					className={clsx(
						"font-semibold h-full text-center transition-colors duration-250 ease-in-out cursor-default flex-shrink-0",
						{
							"text-base text-heading w-12  md:w-20 xl:w-24":
								variant === "default",
							"text-sm text-white w-8 md:w-10 ": variant === "dark",
						}
					)}
					type="text"
					{...register(
						"quantity",
						{
							onChange : (e:any) => {setCount(e.target.value)}
						}
					)}
				/>

				<span
					onClick={() => handleEdit('plus')}
					className={clsx(
						"flex items-center justify-center h-full flex-shrink-0 transition ease-in-out duration-300 focus:outline-none cursor-pointer",
						{
							"w-10 md:w-12 text-heading border-s border-gray-300 hover:text-white hover:bg-heading":
								variant === "default",
							"w-8 md:w-9 text-white bg-heading hover:bg-gray-600 focus:outline-none":
								variant === "dark",
						}
					)}
				>
					<PlusIcon width={size} height={size} />
				</span>
			</div>
			
		</>
	)
}