import Counter from "#/components/product/counter";
import { loggedIn, reviews } from '#/lib'
import ProductMetaReview from "#/components/product/product-meta-review";
import Link from "next/link";
import ProductGallery from "./productGallery";
import Image from "next/image";
import Preorder from "./preorder";

interface Product {
	product: {
		product_id: number;
		name: string;
		image?: string;
		description: string;
		formatted_price: string;
		special: number;
		formatted_special: string;
		model: string;
		categories: any[];
		tag: string;
		attributes: any;
		images?: any;
		quantity?: number | any;
	}
}

export default async function ProductSingleDetails({ product }: Product) {
	const isLogedIn = await loggedIn();
	const prodReviews = await reviews(product.product_id);
	
	const productData = [
		{
			title: 'Описание товара',
			type: 'description',
			content: product.description
		},
		{
			title: 'Характеристики',
			type: 'attrib',
			content: product.attributes
		},
		{
			title: 'Отзывы',
			type: 'review',
			product_id: product.product_id
		}
	]

	return (
		<div className="block lg:grid grid-cols-9 gap-x-10 xl:gap-x-14 pt-7 pb-10 lg:pb-14 2xl:pb-20 items-start">

			{product.images.length ? 
				<ProductGallery product={product} /> :
				<div className="col-span-5 grid grid-cols-1 gap-2.5 relative">
					{product.special && <div className="absolute text-center z-10 right-1 top-1 bg-[#F91155] text-white p-[0.7rem] lg:p-4 w-[40px] lg:w-[55px] h-[40px] lg:h-[55px] font-bold text-lg lg:text-2xl leading-none lg:leading-none drop-shadow-[2px_-2px_1px_rgba(0,0,0,0.35)]">%</div>}
					<Image
						src={
							product?.image
							? `${process.env.NEXT_PUBLIC_OPENCART_DOMAIN_URL}/image/${product?.image}`
							: "/assets/placeholder/products/product-gallery.svg"
						}
						width={400}
						height={400}
						alt={product.name}
						className="object-cover w-full"
					/>
				</div>
			}

			<div className="col-span-4 pt-8 lg:pt-0">
				<div className="pb-3 border-b border-gray-300">
					<h2 className="text-heading text-lg md:text-xl lg:text-2xl 2xl:text-3xl font-bold hover:text-black mb-3.5">
						{product?.name}
					</h2>

					<div className="py-6">
						<ul className="text-sm space-y-5 pb-1">
							<li>
								<span className="font-semibold text-heading inline-block pe-2">
									Модель:
								</span>
								{product?.model}
							</li>
							<li>
								<span className="font-semibold text-heading inline-block pe-2">
									Категория:
								</span>
								<Link
									href={`/category/${product?.categories[0]?.category_id}`}
									className="transition hover:underline hover:text-heading"
								>
									{product?.categories[0]?.name}
								</Link>
							</li>
							{product?.tag && (
								<li className="productTags">
									<span className="font-semibold text-heading inline-block pe-2">
										Теги:
									</span>
									{product.tag.split(',').map((tag: any) => (
										<Link
											key={tag}
											href={tag}
											className="inline-block pe-1.5 transition hover:underline hover:text-heading last:pe-0"
										>
											{tag}
											<span className="text-heading">,</span>
										</Link>
									))}
								</li>
							)}
						</ul>
					</div>

					<div className="flex items-center mt-5">
						<div className="text-heading font-bold text-base md:text-xl lg:text-2xl 2xl:text-4xl pe-2 md:pe-0 lg:pe-2 2xl:pe-0">
							{product.special ? product.formatted_special : product.formatted_price}
						</div>
						{product.special && (
							<span className="line-through font-segoe text-gray-400 text-sm md:text-base lg:text-lg xl:text-xl ps-2">
								{product.formatted_price}
							</span>
						)}
					</div>
				</div>

				<div className="flex items-center gap-x-4 ltr:md:pr-32 rtl:md:pl-32 ltr:lg:pr-12 rtl:lg:pl-12 ltr:2xl:pr-32 rtl:2xl:pl-32 ltr:3xl:pr-48 rtl:3xl:pl-48 py-8">
					{ product?.quantity > 0 ?
						<Counter
							item={product}
						/> : 
						<Preorder isLogedIn={isLogedIn} product={product} />
					}
				</div>

				<ProductMetaReview data={productData} isLogedIn={isLogedIn} prodReviews={prodReviews} />
			</div>
		</div>
	)
}