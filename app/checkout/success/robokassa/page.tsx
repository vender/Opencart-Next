import Container from "#/components/ui/container";
import OrderInformation from "#/components/checkout/order-information";
import { use } from 'react'
import { redirect } from 'next/navigation'
import { getOrder, orderSuccess } from "#/lib";

type Params = Promise<{ slug: string }>
type SearchParams = Promise<{ [key: string]: string | string[] | undefined | any}>

export default function Page(props: {
    params: Params
    searchParams: SearchParams
}) {
    const searchParams = use(props.searchParams);
    let order = use(getOrder(searchParams?.InvId));
    if(order?.order_id) {
        use(orderSuccess());
    } else {
        redirect('/');
    }

    return (
        <Container>
            <OrderInformation lastOrder={order} />
        </Container>
    )
}
