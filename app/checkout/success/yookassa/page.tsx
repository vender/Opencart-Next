import Container from "#/components/ui/container";
import OrderInformation from "#/components/checkout/order-information";
import { redirect } from 'next/navigation'
import { PaymentYookassa, getOrder, orderSuccess } from "#/lib";

export default async function page({searchParams}:any) {
    console.log(searchParams);
    const Yookassa = await PaymentYookassa(searchParams['orderId']);
    let order:any = 384;
    
    if(searchParams['orderId'] && Yookassa != 0) {
        await orderSuccess();
        order = await getOrder(Yookassa);
    } else {
        redirect('/');
    }    

    return (
        <Container>
            <OrderInformation lastOrder={order} />
        </Container>
    )
}
