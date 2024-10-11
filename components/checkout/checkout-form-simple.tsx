"use client"
import Input from "#/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import TextArea from "#/components/ui/text-area";
import Button from "#/components/ui/button";
// import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';
import { useId, useState } from "react";
// import { RadioBox } from "../ui/radiobox";
import { useRouter } from "next/navigation";

interface CheckoutInputType {
	firstName: string;
	// lastName: string;
	phone: string;
	// email: string;
	// address: string;
	// save: boolean;
	note: string;
	// payment_method: string;
	// shipping_method: string;
}

export default function CheckoutFormSimple({ userInfo }: any) {	
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<CheckoutInputType>();

	async function onSubmit(input: CheckoutInputType) {
		setIsLoading(true);
		
		const response = await fetch(`/api/checkout/confirm-simple`, {
			method: 'POST',
			body: JSON.stringify(input)
		});

		const order = await response.json();

		// console.log(order);

		if(order?.id) {
			router.push('checkout/success/cod');
		} else {
			setIsLoading(false);
			alert('Ошибка оформления заказа. Попробуйте позже.')
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

					<TextArea
						labelKey="Комментарий к заказу"
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