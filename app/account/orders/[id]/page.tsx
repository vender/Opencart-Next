import OrderDetails from "#/components/account/order-details";
import { getOrder } from "#/lib";
import { use } from 'react'

export default function OrderPage(props:any) {
	const params = use(props.params) as any;
	const order = use(getOrder(params.id));
	
	return <OrderDetails order={order} className="p-0" />
}