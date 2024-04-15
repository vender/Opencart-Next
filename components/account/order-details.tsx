"use client"
import { OrderItem } from "#/lib/types";
import { FaPlus } from "react-icons/fa";
import Link from "next/link";

const OrderItemCard = ({ product }: { product: OrderItem }) => {
	return (
		<tr
			className="border-b font-normal border-gray-300 last:border-b-0"
			key={product.product_id}
		>
			<td className="p-4">
				{product.name} * {product.quantity}
			</td>
			<td className="p-4">
				{product.total} ₽
				<Link
					href={`/product/${product.product_id}?open=review`}
					className="text-sm leading-4 bg-heading text-white px-3 py-2.5 inline-flex gap-1 rounded-md hover:bg-gray-600 ml-3"
				>
					<FaPlus /> Отзыв
				</Link>
			</td>
		</tr>
	);
};

const OrderDetails: React.FC<{ className?: string; order: any }> = ({
	className = "pt-10 lg:pt-12",
	order
}) => {

	return (
		<div className={className}>
			<h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
				Информация о заказе:
			</h2>
			<table className="w-full text-heading font-semibold text-sm lg:text-base">
				<thead>
					<tr>
						<th className="bg-gray-150 p-4 text-start first:rounded-ts-md w-1/2">
							Товар(ы)
						</th>
						<th className="bg-gray-150 p-4 text-start last:rounded-te-md w-1/2">
							Сумма
						</th>
					</tr>
				</thead>
				<tbody>
					{order?.products?.map((product:any, index:number) => (
						<OrderItemCard key={index} product={product} />
					))}
				</tbody>
				<tfoot>
					<tr className="odd:bg-gray-150">
						<td className="p-4 italic">Доставка:</td>
						<td className="p-4">
							0
							<span className="text-[13px] font-normal ps-1.5 inline-block">
								{order.shipping_method}
							</span>
						</td>
					</tr>
					<tr className="odd:bg-gray-150">
						<td className="p-4 italic">Способ оплаты:</td>
						<td className="p-4">{order?.payment_method}</td>
					</tr>
					<tr className="odd:bg-gray-150">
						<td className="p-4 italic">Итого:</td>
						<td className="p-4">{Math.round(order.total)} ₽</td>
					</tr>
					<tr className="odd:bg-gray-150">
						<td className="p-4 italic">Комментарий:</td>
						<td className="p-4">{order.comment}</td>
					</tr>
				</tfoot>
			</table>
		</div>
	);
};

export default OrderDetails;
