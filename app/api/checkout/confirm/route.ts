import { NextRequest, NextResponse } from 'next/server';
import { confirmOrder } from '#/lib';

export async function POST(req: NextRequest): Promise<Response> {
  const {firstName, phone} = await req.json();
  try {
    const result = await confirmOrder(firstName, phone);
    return NextResponse.json({ result, status: 204 });
  } catch (e) {
    return NextResponse.json({ status: 500 });
  }
}