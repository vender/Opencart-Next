"use client"
import Input from "#/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import TextArea from "#/components/ui/text-area";
import Button from "#/components/ui/button";
// import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';
import { useId, useState } from "react";
import { RadioBox } from "../ui/radiobox";
import { useRouter } from "next/navigation";

interface CheckoutInputType {
	firstName: string;
	phone: string;
	note: string;
	payment_method: string;
	shipping_method: string;
}

export default function CheckoutForm({ address, userInfo, paymentMethods, shipingMethods }: any) {	
	// const id = useId();
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [payShow, setPayShow] = useState(false);
	const [value, setValue] = useState(address && address[0]?.address_1 ? address[0]?.address_1 : '') as any;

	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<CheckoutInputType>();
		
	const setPaymentMethod:any = async (code:string, comment:string) => {		
		const response = await fetch(`/api/checkout/set-payment-method`, {
			method: 'POST',
			body: JSON.stringify({
				code,
				comment,
			})
		});
		
		const data:{result:boolean,status:number} = await response.json();
		return data;
	}
	
	const setShippingMethod:any = async (code:string) => {
		if(code) {
			const response = await fetch(`/api/checkout/set-shipping-method`, {
				method: 'POST',
				body: JSON.stringify({
					code,
				})
			});
			const data:{status: number} = await response.json();
			return data;
		} else {
			return [];
		}
	}

	const confirmOrder = async (firstName:string, phone:string) => {
		const response = await fetch(`/api/checkout/confirm`, {
			method: 'POST',
			body: JSON.stringify({
				firstName,
				phone,
			})
		});

		const data:{status: number} = await response.json();
		return data;
	}

	async function onSubmit(input: CheckoutInputType) {
		setIsLoading(true);
		
		const setPayShip = await Promise.all([setPaymentMethod(input.payment_method, input.note), setShippingMethod(input.shipping_method)]) as any;
		
		if(!setPayShip?.reason) {
			const confirm:any = await confirmOrder(input?.firstName, input?.phone);
			
			const payment_code = confirm?.result?.payment_code;
			console.log(confirm);
			
			if(confirm?.result?.payment) {
				router.push(confirm?.result?.payment);
			} else {
				alert('Ошибка оформления заказа. Попробуйте позже.')
			}
		}
	}

	function showPay (code:any) {
		if(code == 'pickup.pickup') {
			setPayShow(true);
		} else {
			setPayShow(false);
		}
	}

	return (
		<>
			<h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
				Покупатель
			</h2>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="w-full mx-auto flex flex-col justify-center "
				noValidate
			>
				<div className="flex flex-col space-y-4 lg:space-y-5">
					<div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
						<Input
							labelKey="Имя"
							{...register("firstName", {
								required: "Введите имя",
							})}
							errorKey={errors.firstName?.message}
							variant="solid"
							className="w-full lg:w-1/2 "
							defaultValue={userInfo?.firstname}
							disabled={isLoading}
						/>

						<Input
							type="tel"
							labelKey="Телефон"
							{...register("phone", {
								required: "Введите телефон",
							})}
							errorKey={errors.phone?.message}
							variant="solid"
							className="w-full lg:w-1/2 lg:ms-3 mt-2 md:mt-0"
							defaultValue={userInfo?.telephone}
							disabled={isLoading}
						/>
					</div>

					{shipingMethods?.length ?
						shipingMethods.map((Method:any, idx:number) =>
							Method?.quote && Method?.quote.map((shipping:any) =>
									<RadioBox 
										key={shipping?.code}
										labelKey={`${shipping.title} - ${shipping.text}`}
										{...register("shipping_method", {
											required: "Выберите способ доставки",
										})}
										value={shipping?.code}
										data-shipcode={shipping?.code}
										description={shipping.description}
										onClick={(e) => showPay(shipping?.code)}
										wrapperClassName=""
										checked={idx == 0 ? true : false}
									/>
							)
						) : null
					}
					{errors.shipping_method && <p className="my-2 text-xs text-red-500">{errors.shipping_method?.message}</p>}


					<h3 className="text-lg md:text-xl xl:text-xl font-bold text-heading mb-6 xl:mb-8">
						Способ оплаты
					</h3>

					{paymentMethods && paymentMethods.map((payment:any, idx:number)=> {
						return <RadioBox 
							key={payment?.code}
							labelKey={payment.title}
							{...register("payment_method", {
								required: "Выберите способ оплаты",
							})}
							value={payment?.code}
							data-paycode={payment?.code}
							description=''
							checked={idx == 0 ? true : false}
							// wrapperClassName={payment?.code == 'cod' && !payShow ? 'hidden' : ''}
							wrapperClassName=''
						/>
					})}
					{errors.payment_method && <p className="my-2 text-xs text-red-500">{errors.payment_method?.message}</p>}

					<TextArea
						labelKey="Коментарий к заказу"
						{...register("note")}
						placeholderKey=""
						className="relative pt-3 xl:pt-6"
					/>
					<div className="flex w-full">
						<Button
							type="submit"
							loading={isLoading}
							className="w-full sm:w-auto"
							disabled={isLoading}
						>
							Оформить заказ
						</Button>
					</div>
				</div>
			</form>
		</>
	)
}