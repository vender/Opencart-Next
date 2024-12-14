import Container from "#/components/ui/container";
import OrderInformation from "#/components/checkout/order-information";
import { redirect } from 'next/navigation'
import { getOrders, orderSuccess } from "#/lib";

export default async function page() {
    await orderSuccess();
    const lastOrder = await getOrders(0, 1);

    if(lastOrder?.length == 0){
        redirect('/');
    }

    return (
        <>
            <Container>
                <OrderInformation lastOrder={lastOrder[0]} />
            </Container>
        </>
    )
}
