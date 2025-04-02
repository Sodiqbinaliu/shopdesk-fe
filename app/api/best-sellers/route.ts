import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const organization_id = searchParams.get('organization_id');

  if (!organization_id) {
    return NextResponse.json({ error: 'Missing organization_id' }, { status: 400 });
  }

  const accessToken = (await cookies()).get('access_token')?.value;
  if (!accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const [productRes, salesRes] = await Promise.all([
    fetch(`https://api.timbu.cloud/products?organization_id=${organization_id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    }),
    fetch(`https://api.timbu.cloud/sales?organization_id=${organization_id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    }),
  ]);

  const productData = await productRes.json();
  const salesData = await salesRes.json();

  const salesMap: Record<string, { quantity: number; amount: number }> = {};
  for (const sale of salesData.data || []) {
    for (const item of sale.products_sold || []) {
      const id = item.product_id;
      if (!salesMap[id]) salesMap[id] = { quantity: 0, amount: 0 };
      salesMap[id].quantity += item.quantity || 0;
      salesMap[id].amount += item.amount || 0;
    }
  }

  const enrichedProducts = (productData.items || []).map((product: any) => ({
    ...product,
    quantity_sold: salesMap[product.id]?.quantity || 0,
    turnover: salesMap[product.id]?.amount || 0,
  }));

  return NextResponse.json({ bestSellers: enrichedProducts });
}

export async function POST(req: NextRequest) {
  const { organization_id, product_ids, date_range_start, date_range_end } = await req.json();

  if (!organization_id || !Array.isArray(product_ids)) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const accessToken = (await cookies()).get('access_token')?.value;
  if (!accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const response = await fetch(`https://api.timbu.cloud/products/profit-analytics`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      organization_id,
      product_ids,
      date_range_start,
      date_range_end,
    }),
  });

  if (!response.ok) {
    return NextResponse.json({ error: 'Failed to fetch profit analytics' }, { status: response.status });
  }

  const profitData = await response.json();
  return NextResponse.json({ profit: profitData });
}
