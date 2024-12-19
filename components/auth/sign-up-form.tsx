"use client"
import Input from "#/components/ui/input";
import PasswordInput from "#/components/ui/password-input";
import Button from "#/components/ui/button";
// import InputMask from "react-input-mask";
import { useMask } from '@react-input/mask';
import { Controller, useForm } from "react-hook-form";
import { AddressSuggestions } from 'react-dadata';
import { useRouter, redirect } from 'next/navigation';
import { useId, useState } from "react";
import { useCookies } from 'react-cookie';

function jsonCheck(jsonString:any) {
	try {
		return JSON.parse(jsonString);
	} catch (e) {
		return false;
	}
}

export const clearTel = (tel:any) => tel.replace(/[^0-9]/g, '');

const isNotFilledTel = (v:any) => {
	const clearedTel = clearTel(v);
	return clearedTel.length < 11 ? 'Введите номер телефона' : undefined;
};

export default function SignUpForm({addressShow, className = ''}:{addressShow:boolean, className: string}) {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	const [, setCookie] = useCookies(['x-session-id']);
	const [adres, setAdres] = useState() as any;

	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm() as any;

	const id = useId();

	const signUp = async (params:any) => {
		
		setIsLoading(true);
		
		const response = await fetch(`/api/user/signup`, {
			method: 'POST',
			body: JSON.stringify({
				firstname: params.firstname,
				lastname: params.lastname,
				email: params.email,
				phone: params.phone,
				address: adres.value,
				password: params.password,
				city: adres?.data?.city,
				postcode: adres?.data?.postal_code
			})
		});
		const data = await response.json();
		console.log(data);
		
		if(data?.result?.register && !jsonCheck(data?.result?.register)) {
			setCookie('x-session-id', data?.result?.register, {
				path: '/',
				secure: process.env.NODE_ENV === 'production'
			});
			router.push("/");
			alert('Вы успешно зарегистрировались');
		} else {
			alert(jsonCheck(data?.result?.register)?.error);
		}

		setIsLoading(false);
	}

	function onSubmit(input:any) {
		console.log(input);
		
		if(adres !== undefined) {
			signUp(input);
		} else {
			alert("Заполните полный адрес")
		}
	}

	const phoneInputRef = useMask({
		mask: '+7 (___) ___-__-__',
		replacement: { _: /\d/ },
		showMask: true
	});

	return (
		<div className={`py-5 px-5 sm:px-8 bg-white mx-auto rounded-lg ${className} border border-gray-300`}>
			<h2 className="text-center mb-6 pt-2.5 font-bold text-lg">Регистрация пользователя</h2>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col justify-center"
				noValidate
			>
				<div className="flex flex-col space-y-4">
					<Input
						labelKey="Имя"
						type="text"
						variant="solid"
						{...register("firstname", {
							required: "Введите имя",
						})}
						errorKey={errors.firstname?.message}
					/>
					<Input
						labelKey="Фамилия"
						type="text"
						variant="solid"
						{...register("lastname", {
							required: "Введите фамилию",
						})}
						errorKey={errors.firstname?.message}
					/>
					<Input
						labelKey="Email"
						type="email"
						variant="solid"
						{...register("email", {
							required: "Введите email",
							pattern: {
								value:
									/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
								message: "не верный email",
							},
						})}
						errorKey={errors.email?.message}
					/>
					
					<Controller
						control={control}
						{...register("phone", {
							required: "Введите номер телефона"
						})}
						rules={{
							validate: {
								inputTelRequired: isNotFilledTel,
							},
						}}
						errorKey={errors.phone?.message}
						render={({ field }) => (
							<Input 
								name="phone"
								labelKey="Номер телефона" 
								type="tel" 
								variant="solid" 
								ref={phoneInputRef} 
								onChange={(e:any) => {
									e.persist();
									field.onChange(e.target.value);
								}}
							/>

							// <InputMask 
							// 	mask="+7 (999) 999-99-99" 
							// 	showMask
							// 	onChange={(e:any) => {
							// 		e.persist();
							// 		field.onChange(e.target.value);
							// 	}}
							// />

							// <InputMask
							// 	value={field.value}
							// 	mask="+7 (999) 999-99-99"
							// 	maskPlaceholder={'_'}
							// 	alwaysShowMask
							// 	onChange={(e:any) => {
							// 		e.persist();
							// 		field.onChange(e.target.value);
							// 	}}
							// >
							// 	<Input name="phone" labelKey="Номер телефона" type="tel" variant="solid" />
							// </InputMask>
						)}
					/>
					{errors.phone && <p className="my-2 text-xs text-red-500">{errors.phone?.message}</p>}

					{addressShow && 
					<>
						<label htmlFor="address" className="block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer">Адрес доставки</label>
					
						<Controller
							control={control}
							{...register("address", {
								required: "Введите адрес",
							})}
							render={({ field }) =>
								<AddressSuggestions token="2cd34967db3481dfbeb3c3bffa23072f5fbedcfe" defaultQuery={adres} uid={id} onChange={setAdres}
									inputProps={
										{
											className: 'py-2 px-4 md:px-5 w-full appearance-none transition duration-150 ease-in-out border text-input text-xs lg:text-sm font-body rounded-md placeholder-body min-h-12 transition duration-200 ease-in-out bg-white border-gray-300 focus:outline-none focus:border-heading h-11 md:h-12',
											...field
										}
									}
								/>}
						/>
					</>
					}

					{errors.address && <p className="my-2 text-xs text-red-500">{errors.address?.message}</p>}
					
					<PasswordInput
						labelKey="Пароль"
						errorKey={errors.password?.message}
						{...register("password", {
							required: "Введите пароль",
							minLength: 4,
							maxLength: 20
						})}
					/>
					{errors.password && (
						<span role="alert">В пароле должно быть от 4 до 20 символов</span>
					)}

					<div className="relative">
						<Button
							type="submit"
							loading={isLoading}
							disabled={isLoading}
							className="h-11 md:h-12 w-full mt-2"
							title="Зарегистрироваться"
						>
							Зарегистрироваться
						</Button>
					</div>
				</div>
			</form>
		</div>
	);
}