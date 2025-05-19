import { NextRequest, NextResponse } from 'next/server';
import { addItemToCart, removeFromCart, updateCartItem } from '#/lib';

export async function POST(req: NextRequest): Promise<Response> {
  const {product_id, quantity, type, cart_id, options} = await req.json();
  
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
  const cart_id:string|null = searchParams.get('cart_id');

  try {
    await removeFromCart(cart_id);
    return NextResponse.json({ status: 204 });
  } catch (e) {
    return NextResponse.json({ status: 500 });
  }
}