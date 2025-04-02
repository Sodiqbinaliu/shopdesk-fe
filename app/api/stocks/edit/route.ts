import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function PUT(req: Request) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value;

    const body = await req.json();
    const stock_id = body.stock_id;
    const organization_id = body.organization_id;
    if (!stock_id) {
      return NextResponse.json(
        { message: 'Stock ID is required' },
        { status: 400 }
      );
    }

    const response = await fetch(`https://api.timbu.cloud/stocks/${stock_id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        name: body.name,
        buying_price: body.buying_price,
        quantity: body.quantity,
        currency_code: body.currency_code,
        organization_id: organization_id,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(errorData, { status: response.status });
    }

    return NextResponse.json(
      { message: 'Stock updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Internal Server Error',
        error: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}
