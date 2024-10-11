import { NextRequest, NextResponse } from 'next/server';
import { addItemToCart, removeFromCart, updateCartItem } from '#/lib';

function formatErrorMessage(err: Error): string {
  return JSON.stringify(err, Object.getOwnPropertyNames(err));
}

export async function POST(req: NextRequest): Promise<Response> {
  const {product_id, quantity, type, cart_id, options} = await req.json();
  
  // if (!cartId?.length) {
  //   return NextResponse.json({ error: 'Missing cartId or variantId' }, { status: 400 });
  // }
  try {
    if(type) {
      await updateCartItem(cart_id, quantity);
    } else {
      await addItemToCart(product_id, quantity, options);
    }
    return NextResponse.json({ status: 204 });
  } catch (e) {
    return NextResponse.json({ status: 500 });
  }
}

// Remove Cart item
export async function GET(req: NextRequest): Promise<Response> {
  const { searchParams } = new URL(req.url);
  const cart_id = searchParams.get('cart_id');

  // if (!cart_id) {
  //   return NextResponse.json({ error: 'Missing cartId' }, { status: 400 });
  // }
  try {
    await removeFromCart(cart_id);
    return NextResponse.json({ status: 204 });
  } catch (e) {
    return NextResponse.json({ status: 500 });
  }
}