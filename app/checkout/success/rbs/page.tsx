import Container from "#/components/ui/container";
import OrderInformation from "#/components/checkout/order-information";
import { redirect } from 'next/navigation'
import { PaymentRbs, getOrder } from "#/lib";

export default async function page({searchParams}:any) {
    const rbs = await PaymentRbs(searchParams['orderId']);
    let order:any;

    if(searchParams['orderId'] && rbs != 0) {
        // redirect('/');
        alert(rbs);
    } else {
        order = await getOrder(rbs);
    }    

    return (
        <Container>
            <OrderInformation lastOrder={order} />
        </Container>
    )
}
