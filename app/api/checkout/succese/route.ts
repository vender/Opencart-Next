import { NextRequest, NextResponse } from 'next/server';
import { orderSuccess } from '#/lib';

export async function POST(req: NextRequest): Promise<Response> {

  try {
    const result = await orderSuccess();
    return NextResponse.json({ result, status: 204 });
  } catch (e) {
    return NextResponse.json({ status: 500 });
  }
}