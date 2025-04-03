import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const organization_id = searchParams.get('organization_id');

  if (!organization_id) {
    return NextResponse.json(
      { error: 'Missing organization_id' },
      { status: 400 }
    );
  }

  const cookieStore = cookies();
  const accessToken = (await cookieStore).get('access_token')?.value;

  if (!accessToken) {
    return NextResponse.json(
      { error: 'Missing access token' },
      { status: 401 }
    );
  }

  try {
    const response = await fetch(
      `https://api.timbu.cloud/reports/sales?organization_id=${organization_id}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch sales report from API');
    }

    const data = await response.json();
    const totalSold = data.sales_count ?? 0;

    return NextResponse.json({ total: totalSold }, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch sales report:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
