"use client"
import { useState } from "react";
import ProductOptions from "./product-options";

export default function ProductOptionsWrapper({options, register, errors, optionSumm, setOptionSumm}:any) {
    const [attributes, setAttributes] = useState<{ [key: string]: string }>({});
    
    function handleAttribute(attribute: any) {      
		setAttributes((prev) => ({
			...prev,
			...attribute,
		}));
	}

    return (
        <>
            {options?.map((variation:any) => {
                return (
                    <ProductOptions
                        key={variation.product_option_id}
                        register={register}
                        errors={errors}
                        optionSumm={optionSumm}
                        setOptionSumm={setOptionSumm}
                        product_option_id={variation.product_option_id}
                        title={variation.name}
                        required={variation.required}
                        attributes={variation.product_option_value}
                        active={attributes[variation.product_option_id]}
                        onClick={handleAttribute}
                    />
                );
            })}
        </>
    )
}
