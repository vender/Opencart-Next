import { NextRequest, NextResponse } from 'next/server';
import { addOrder } from '#/lib';

export async function POST(req: NextRequest): Promise<Response> {
  const { firstName, phone, note } = await req.json();
  
  try {
    const id = await addOrder(firstName, phone, note);
    return NextResponse.json({ id, status: 204 });
  } catch (e) {
    return NextResponse.json({ status: 500 });
  }
}