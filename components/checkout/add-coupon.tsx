"use client"
import { useForm } from "react-hook-form";
import Input from "#/components/ui/input";
import Button from "#/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface CheckoutInputType {
	coupon: string;
}

export default function Coupon({className}:any) {
    const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<CheckoutInputType>();

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    async function onSubmit(input: CheckoutInputType) {
		setIsLoading(true);

        const response = await fetch(`/api/checkout/coupon`, {
			method: 'POST',
			body: JSON.stringify({
				code: input?.coupon,
			})
		});

		const data:{result: {coupon_code:string,},status: number} = await response.json();
        
        if(data?.result?.coupon_code == input.coupon) {
            alert(`Применен код ${data?.result?.coupon_code}`);
            router.refresh();
        } else if(data?.result?.coupon_code.length && data?.result?.coupon_code != input.coupon){
            alert(`Уже применен код ${data?.result?.coupon_code}`);
        } else {
            alert("Код не найден");
        }
        
        setIsLoading(false);

	}

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={className}
            noValidate
        >
            <Input
                {...register("coupon", {
                    required: "Введите купон",
                })}
                errorKey={errors.coupon?.message}
                variant="solid"
                className="w-2/3"
                disabled={isLoading}
                placeholder="Купон"
            />

            <div className="w-1/3">
                <Button
                    type="submit"
                    loading={isLoading}
                    className="w-full !p-[0.9rem] lg:!p-[0.9rem]"
                    disabled={isLoading}
                    title="Применить"
                >
                    Применить
                </Button>
            </div>

        </form>
    )
}
