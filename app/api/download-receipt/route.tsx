import { Receipt } from '@/components/modal/modalV3/pdf';
import { renderToBuffer } from '@react-pdf/renderer';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { orderNumber, currentDate, cartItems, totalQuantity, totalPrice } =
      await req.json();

    const pdfStream = await renderToBuffer(
      <Receipt
        cartItems={cartItems}
        currentDate={currentDate}
        orderNumber={orderNumber}
        totalPrice={totalPrice}
        totalQuantity={totalQuantity}
      />
    );

    return new NextResponse(pdfStream as unknown as ReadableStream, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=document.pdf',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}
