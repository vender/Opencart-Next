import clsx from "clsx";
import { useEffect, useState } from "react";

interface Props {
	className?: string;
	register?: any;
	errors?: any;
	title: string;
	required?: boolean;
	attributes: {
		id: number;
		value: string;
		meta: string;
	}[];
	product_option_id?: any;
	active: string;
	onClick: any;
	optionSumm?: any;
	setOptionSumm?: any;
}

export default function ProductOptions({
	className = "mb-4",
	register,
	errors,
	title,
	required,
	attributes,
	product_option_id,
	active,
	onClick,
	optionSumm,
	setOptionSumm
}: Props) {
	const [ optionPrice, setOptionPrice] = useState(0);

	// useEffect(() => {
	// 	console.log(optionSumm.includes(1));
	// }, [optionSumm]);
	
	return (
		<div className={className}>
			<h3 className="text-base md:text-lg text-heading font-semibold mb-2.5 capitalize">
				{title}
			</h3>
			<div className="flex flex-wrap colors -mr-3">
				{attributes?.map(({ product_option_value_id, name }:any) => {
					return (
						<label
							key={product_option_value_id}
							htmlFor={`option-id-${product_option_value_id}`}
							className={clsx(
								"cursor-pointer rounded border  w-9 md:w-11 h-9 md:h-11 p-1 mb-2 md:mb-3 mr-2 md:mr-3 flex justify-center items-center text-heading text-xs md:text-sm uppercase font-semibold transition duration-200 ease-in-out hover:border-black",
								{"border-black": name === active}, {"border-gray-350" : name != active}
							)}
						>
							{name}
							<input
								id={`option-id-${product_option_value_id}`}
								type="radio"
								className="hidden"
								onClick={() => {
									onClick({[product_option_id]: name });
								}}
								{...register(product_option_id, { required: required ? "Выберите значение опции" : false })}
								defaultValue={product_option_value_id}
							/>
						</label>
					)
				})}
			</div>
			{errors[product_option_id] && <div className="text-red-500">{errors[product_option_id]?.message}</div>}
		</div>
	)
}