"use client"
import Input from "#/components/ui/input";
import Button from "#/components/ui/button";
import { useForm } from "react-hook-form";
import TextArea from "#/components/ui/text-area";

interface ContactFormValues {
	name: string;
	email: string;
	message: string;
}

export default function ContactForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ContactFormValues>();
	
	function onSubmit(values: ContactFormValues) {
		console.log(values, "contact");
	}

  	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="w-full mx-auto flex flex-col justify-center "
			noValidate
		>
			<div className="flex flex-col space-y-5">
				<div className="flex flex-col md:flex-row space-y-5 md:space-y-0">
					<Input
						labelKey="Имя"
						{...register("name", { required: "заполните поле" })}
						className="w-full md:w-1/2 "
						errorKey={errors.name?.message}
						variant="solid"
					/>
					<Input
						labelKey="Введите свой Email"
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
					/>
				</div>
				<TextArea
					labelKey="Сообщение"
					{...register("message", { required: "заполните поле" })}
					className="relative mb-4"
					errorKey={errors.message?.message}
				/>
				<div className="relative">
					<Button
						type="submit"
						className="h-12 lg:h-14 mt-1 text-sm lg:text-base w-full sm:w-auto"
					>
						Отправить
					</Button>
				</div>
			</div>
		</form>
  	)
}