"use client"
import Input from "#/components/ui/input";
import Button from "#/components/ui/button";
import { useForm } from "react-hook-form";
import TextArea from "#/components/ui/text-area";
import { useActionState } from "react";
import { sendQuestion } from "#/app/actions";

interface ContactFormValues {
	name: string;
	email: string;
	message: string;
}

export default function ContactForm({productName}:{productName: string}) {
	const [state, formAction] = useActionState(sendQuestion, null);

	const {
		register,
		formState: { errors },
	} = useForm<ContactFormValues>();

  	return (
		<form
			action={formAction}
			className="w-full mx-auto flex flex-col justify-center "
			noValidate
		>
			{state?.error && <div className="p-2 bg-red-400 border border-slate-200 rounded-md mb-3"><h4 className="text-white">{state.error}</h4></div>}
			{state?.message && <div className="p-2 bg-green-600 border border-slate-200 rounded-md mb-3"><h4 className="text-white">{state.message}</h4></div>}
			<div className="flex flex-col space-y-5">
				<div className="flex flex-col md:flex-row space-y-5 md:space-y-0">
					<Input
						labelKey="Имя"
						{...register("name", { required: "заполните поле" })}
						className="w-full md:w-1/2 "
						errorKey={errors.name?.message}
						variant="solid"
						required
					/>
					<Input
						labelKey="Email или номер телефона"
						type="email"
						{...register("email", {
							required: "заполните поле",
							pattern: {
								value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
								message: "неверный формат",
							},
						})}
						className="w-full md:w-1/2 md:ms-2.5 lg:ms-5 mt-2 md:mt-0"
						errorKey={errors.email?.message}
						variant="solid"
						required
					/>
					{productName && <Input type="hidden" name="productName" value={productName} />}
				</div>
				<TextArea
					labelKey="Сообщение"
					{...register("message", { required: "заполните поле" })}
					className="relative mb-4"
					errorKey={errors.message?.message}
					required
				/>
				<div className="relative">
					<Button
						type="submit"
						className="h-12 lg:h-14 mt-1 text-sm lg:text-base w-full sm:w-auto"
						title="Отправить"
					>
						Отправить
					</Button>
				</div>
			</div>
		</form>
  	)
}