"use client"
import Counter from "#/components/product/counter";
// import { loggedIn, getProductColors } from '#/lib'
import ProductMetaReview from "#/components/product/product-meta-review";
import ProductOptionsWrapper from "./product-options-wrapper";
import { useForm } from "react-hook-form";
import Button from "#/components/ui/button";
import { startTransition, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import ProductColors from "./product-colors";
import ProductGallery from "./productGallery";
import Image from "next/image";
import Preorder from "./preorder";

interface Props {
	product: {
		product_id: number;
		name: string;
		sku: string;
		image?: string;
		description: string;
		formatted_price: string;
		price?: number | any;
		special: number;
		formatted_special: string;
		model: string;
		categories: any[];
		tag: string;
		attributes: any;
		images?: any;
		quantity?: number | any;
		options?: any;
		cart_id?: number;
	},
	isLogedIn: any,
	prodReviews : any,
	Options : any,
	colors: any
}

export default function ProductSingleDetails({ product, isLogedIn, prodReviews, Options, colors }: Props) {

	const [editing, setEditing] = useState(false);
	const [price, setPrice] = useState(product.special ? Math.round(product.special) : Math.round(product.price));
	const [optionSumm, setOptionSumm] = useState([]);
	const [count, setCount] = useState(1);

	const {
		register,
		setValue,
		handleSubmit,
		formState: { errors }
	} = useForm();
	
	const handleEdit = (type:string) => {
		type == 'minus' && count > 1 ? setCount(Number(count) - 1) : type == 'plus' ? setCount(Number(count) + 1) : null;
	}

	useEffect(() => {
		setValue("quantity", count);
	}, [count]);

	const router = useRouter();

	const onSubmit = handleSubmit(async (formData) => {

		let result = Object.keys(formData).map((key) => [key, formData[key]]).filter((f) => f[0] != "quantity");
		let optionsObj = result.map((item) => {
			return `{ option_id: "${item[0]}", value: "${item[1]}" }`;
		});	

		setEditing(true);

		const response = await fetch(`/api/cart`, {
			method: 'POST',
			body: JSON.stringify({
				product_id: product.product_id,
				cart_id: product.cart_id,
				quantity: count,
				options: optionsObj
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
	});
	
	const productData = [
		{
			title: 'Описание товара',
			type: 'description',
			content: product.description
		},
		// {
		// 	title: 'Характеристики',
		// 	type: 'attrib',
		// 	content: product.attributes
		// },
		// {
		// 	title: 'Отзывы',
		// 	type: 'review',
		// 	product_id: product.product_id
		// }
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
						priority={true}
						alt={product.name}
						className="object-cover w-full"
					/>
				</div>
			}

			<div className="col-span-4 pt-8 lg:pt-0">
				<form onSubmit={onSubmit}>
					<div className="pb-7 mb-7 border-b border-gray-300">
						<h2 className="text-heading text-lg md:text-xl lg:text-2xl 2xl:text-3xl font-bold hover:text-black mb-3.5">
							{product?.name}
						</h2>

						<div className="flex items-center mt-5">
							<div className="text-heading font-bold text-base md:text-xl lg:text-2xl 2xl:text-4xl pe-2 md:pe-0 lg:pe-2 2xl:pe-0">
								{price} ₽
							</div>
							{product.special && (
								<span className="line-through font-segoe text-gray-400 text-sm md:text-base lg:text-lg xl:text-xl ps-2">
									{product.formatted_price}
								</span>
							)}
						</div>
					</div>

					<ProductOptionsWrapper options={Options} register={register} errors={errors} optionSumm={optionSumm} setOptionSumm={setOptionSumm} />

					<div className="pb-3 border-b border-gray-300">
						<ProductColors active={product.product_id} colors={colors} />
					</div>

					<div className="flex items-center gap-x-4 ltr:md:pr-32 rtl:md:pl-32 ltr:lg:pr-12 rtl:lg:pl-12 ltr:2xl:pr-32 rtl:2xl:pl-32 ltr:3xl:pr-48 rtl:3xl:pl-48 py-8">
						{ product?.quantity > 0 ?
							<>
								<Counter register={register} count={count} setCount={setCount} handleEdit={handleEdit}/>
								<Button
									// onClick={addToCart}
									type="submit"
									variant="slim"
									className={`w-full md:w-6/12 xl:w-full`}
									disabled={editing}
									loading={editing}
								>
									<span className="py-2 3xl:px-8">В корзину</span>
								</Button>
							</>
							
							: 
							<Preorder isLogedIn={isLogedIn} product={product} />
						}
					</div>
				</form>
				<ProductMetaReview data={productData} isLogedIn={isLogedIn} prodReviews={false} />
			</div>
		</div>
	)
}