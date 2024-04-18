import clsx from "clsx";
import Image from "next/image";
import { Product } from "#/lib/types";
import Link from "next/link";
import Preorder from "./preorder";
import { loggedIn } from '#/lib'

interface ProductProps {
	product: Product;
	className?: string;
	contactClassName?: string;
	imageContentClassName?: string;
	variant?: "grid" | "gridSlim" | "list" | "listSmall";
	imgWidth?: number | string | any;
	imgHeight?: number | string | any;
	imgLoading?: "eager" | "lazy";
}

export default async function ProductCard({
	product,
	className = "",
	contactClassName = "",
	imageContentClassName = "",
	variant = "grid",
	imgWidth = 340,
	imgHeight = 440,
	imgLoading,
}: ProductProps) {
	// const description = product?.description.replace(/(<([^>]+)>)|(&lt;...|gt;)|&/gi, "");
	const placeholderImage = `/assets/placeholder/products/product-${variant}.svg`;
	const isLogedIn = await loggedIn();

	return (
		<Link href={`/product/${product.product_id}`} className="relative">
			{product.special && <div className="absolute text-center z-10 right-1 top-1 bg-[#F91155] text-white p-[0.7rem] lg:p-4 w-[40px] lg:w-[55px] h-[40px] lg:h-[55px] font-bold text-lg lg:text-2xl leading-none lg:leading-none drop-shadow-[2px_-2px_1px_rgba(0,0,0,0.35)]">%</div>}
			<div
				className={clsx(
					"group box-border overflow-hidden flex rounded-md cursor-pointer",
					{
						"pe-0 pb-2 lg:pb-3 flex-col items-start bg-white transition duration-200 ease-in-out transform hover:-translate-y-1 hover:md:-translate-y-1.5 hover:shadow-product":
							variant === "grid",
						"pe-0 md:pb-1 flex-col items-start bg-white": variant === "gridSlim",
						"items-center bg-transparent border border-gray-100 transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-listProduct":
							variant === "listSmall",
						"flex-row items-center transition-transform ease-linear bg-gray-200 pe-2 lg:pe-3 2xl:pe-4":
							variant === "list",
					},
					className
				)}
				role="button"
				title={product?.name}
			>
				<div
					className={clsx(
						"flex",
						{
							"mb-3 md:mb-3.5": variant === "grid",
							"mb-3 md:mb-3.5 pb-0": variant === "gridSlim",
							"flex-shrink-0 w-32 sm:w-44 md:w-36 lg:w-44":
								variant === "listSmall",
						},
						imageContentClassName
					)}
				>
					<Image
						src={product?.image ? `${process.env.NEXT_PUBLIC_OPENCART_DOMAIN_URL}/image/${product?.image}` : placeholderImage}
						width={imgWidth}
						height={imgHeight}
						loading={imgLoading}
						alt={product?.name || "Product Image"}
						className={clsx("bg-gray-300 object-cover rounded-s-md", {
							"w-full aspect-square rounded-md transition duration-200 ease-in group-hover:rounded-b-none":
								variant === "grid",
							"rounded-md transition duration-150 ease-linear transform group-hover:scale-105":
								variant === "gridSlim",
							"rounded-s-md transition duration-200 ease-linear transform group-hover:scale-105":
								variant === "list",
						})}
					/>
				</div>
				<div
					className={clsx(
						"w-full overflow-hidden",
						{
							"ps-0 lg:ps-2.5 xl:ps-4 pe-2.5 xl:pe-4": variant === "grid",
							"ps-0": variant === "gridSlim",
							"px-4 lg:px-5 2xl:px-4": variant === "listSmall",
						},
						contactClassName
					)}
				>
					
						<h2
							className={clsx("text-heading font-semibold truncate mb-1", {
								"text-sm md:text-base": variant === "grid",
								"md:mb-1.5 text-sm sm:text-base md:text-sm lg:text-base xl:text-lg":
									variant === "gridSlim",
								"text-sm sm:text-base md:mb-1.5 pb-0": variant === "listSmall",
								"text-sm sm:text-base md:text-sm lg:text-base xl:text-lg md:mb-1.5":
									variant === "list",
							})}
						>
							{product?.name}
						</h2>
					{product?.quantity != 0 ? (
						<>
							<p className="text-body text-xs lg:text-sm leading-normal xl:leading-relaxed max-w-[250px] truncate" title={product?.sku}>
								артикул: {product?.sku}
							</p>
							<div className='font-semibold text-sm sm:text-base mt-1.5 flex flex-wrap gap-x-2 lg:text-lg lg:mt-2.5 text-heading'>
								<span className="inline-block">{product.special ? product.formatted_special : product.formatted_price}</span>
								{product.special && (
									<del className="sm:text-base font-normal text-gray-800">
										{product.formatted_price}
									</del>
								)}
							</div>
						</>
					) : <Preorder isLogedIn={isLogedIn} product={product} />}
					
					
					<div>
						
					</div>
				</div>
			</div>
		</Link>
	)
}