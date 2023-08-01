"use client"
import Input from "#/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import TextArea from "#/components/ui/text-area";
import CheckBox from "#/components/ui/checkbox";
import Button from "#/components/ui/button";
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';
import { useEffect, useId, useRef, useState } from "react";
import { RadioBox } from "../ui/radiobox";

interface CheckoutInputType {
	firstName: string;
	lastName: string;
	phone: string;
	email: string;
	address: string;
	// city: string;
	// zipCode: string;
	save: boolean;
	note: string;
}


export default function CheckoutForm({ address, userInfo, paymetMethods, shipingMethods }: any) {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<CheckoutInputType>();

	const id = useId();

	const [value, setValue] = useState(address && address[0]?.address_1) as any;

	function onSubmit(input: CheckoutInputType) {
		input.address = value.data;
		// console.log(input);
	}

	// console.log(value);

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
						/>

						<Input
							labelKey="Фамилия"
							{...register("lastName", {
								required: "Введите фамилию",
							})}
							errorKey={errors.lastName?.message}
							variant="solid"
							className="w-full lg:w-1/2 lg:ms-3 mt-2 md:mt-0"
							defaultValue={userInfo?.lastname}
						/>
					</div>

					<div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
						<Input
							labelKey="E-Mail"
							{...register("email", {
								required: "Введите E-Mail",
							})}
							errorKey={errors.email?.message}
							variant="solid"
							className="w-full lg:w-1/2 "
							defaultValue={userInfo?.email}
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
						/>
					</div>

					<label htmlFor="address" className="block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer">Адрес доставки</label>
					<Controller
						name="address"
						control={control}
						rules={{ required: "Введите адрес" }}
						render={({ field }) =>
							<AddressSuggestions token="2cd34967db3481dfbeb3c3bffa23072f5fbedcfe" defaultQuery={value} uid={id} onChange={setValue}
								inputProps={
									{
										className: 'py-2 px-4 md:px-5 w-full appearance-none transition duration-150 ease-in-out border text-input text-xs lg:text-sm font-body rounded-md placeholder-body min-h-12 transition duration-200 ease-in-out bg-white border-gray-300 focus:outline-none focus:border-heading h-11 md:h-12',
										...field
									}
								}
							/>}
					/>
					{errors.address && <p className="my-2 text-xs text-red-500">{errors.address?.message}</p>}

					{/* <div className="relative flex items-center ">
						<CheckBox name="Сохранить информацию" />
					</div> */}


					<h3 className="text-lg md:text-xl xl:text-xl font-bold text-heading mb-6 xl:mb-8">
						Способ оплаты
					</h3>

					{paymetMethods && paymetMethods.map((payment:any)=>
						<RadioBox key={payment?.quote?.code} labelKey={payment.title} name='payment_method' />
					)}
					
					<h3 className="text-lg md:text-xl xl:text-xl font-bold text-heading mb-6 xl:mb-8">
						Способ доставки
					</h3>

					{shipingMethods && shipingMethods.map((shipping:any)=>
						<RadioBox key={shipping?.quote?.code} labelKey={shipping.title} name='shipping_method' />
					)}


					<TextArea
						labelKey="Коментарий к заказу"
						{...register("note")}
						placeholderKey=""
						className="relative pt-3 xl:pt-6"
					/>
					<div className="flex w-full">
						<Button
							className="w-full sm:w-auto"
						// loading={isLoading}
						// disabled={isLoading}
						>
							Оформить заказ
						</Button>
					</div>
				</div>
			</form>
		</>
	)
}