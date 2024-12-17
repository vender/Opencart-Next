import Container from "#/components/ui/container";
import OrderInformation from "#/components/checkout/order-information";
import { use } from 'react'
import { redirect } from 'next/navigation'
import { getOrder } from "#/lib";

type Params = Promise<{ slug: string }>
type SearchParams = Promise<{ [key: string]: string | string[] | undefined | any}>

export default function page(props: {
    params: Params
    searchParams: SearchParams
}) {
    const searchParams = use(props.searchParams);
    let order = use(getOrder(searchParams?.InvId));
    if(order?.order_id) {
        console.log(order);
    } else {
        redirect('/');
    }

    return (
        <Container>
            <OrderInformation lastOrder={order} />
        </Container>
    )
}
