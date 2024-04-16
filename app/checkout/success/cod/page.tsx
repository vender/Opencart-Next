import Container from "#/components/ui/container";
import OrderInformation from "#/components/checkout/order-information";
import { redirect } from 'next/navigation'
import { PaymentCod, getOrders, orderSuccess } from "#/lib";

export default async function page() {
    const rbs = await PaymentCod();
    let lastOrder:any;
    
    if(rbs) {
        await orderSuccess();
        lastOrder = await getOrders(0, 1);
    } else {
        redirect('/');
    }    

    return (
        <Container>
            <OrderInformation lastOrder={lastOrder[0]} />
        </Container>
    )
}