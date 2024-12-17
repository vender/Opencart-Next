"use client"
import CheckoutItem from "#/components/checkout/checkout-card-item";
import Coupon from "./add-coupon";
import CheckoutCardFooterItem from "./checkout-card-footer-item";

export default function Checkoutcard({cart}:any) {

	return (
		<div className="pt-12 md:pt-0 2xl:ps-4">
			<h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
				Ваш заказ
			</h2>

			{cart ? (
				cart.items.map((item:any) => <CheckoutItem item={item} key={item.product_id} />)
			) : (
				<p className="text-red-500 lg:px-3 py-4">{"text-empty-cart"}</p>
			)}

			{cart.totals.map((item: any) => (
				<CheckoutCardFooterItem item={item} key={item.code} />
			))}

			<Coupon className="m-5 w-full mx-auto flex flex-row justify-center items-start gap-4" />

		</div>
	)
}