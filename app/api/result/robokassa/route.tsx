import { type NextRequest } from 'next/server';
import { Payment_Robokassa } from "#/lib";
 
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const OutSum = searchParams.get('OutSum') as string;
  const InvId = searchParams.get('InvId') as string;
  const SignatureValue = searchParams.get('SignatureValue') as string;

  const robokassa = await Payment_Robokassa(OutSum, InvId, SignatureValue);
  
  if(robokassa) {
    return new Response(robokassa, {
      status: 200
    })
  } else {
    return new Response(robokassa, {
      status: 404
    })
  }
}
