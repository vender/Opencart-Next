import OrderDetails from "#/components/account/order-details";
import { getOrder } from "#/lib";

export default async function OrderPage({params}:any) {
	const { id } = await params;
	const order = await getOrder(id);
	
	return <OrderDetails order={order} className="p-0" />
}