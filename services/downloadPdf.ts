import { Product } from '@/types/product';

type PDFProps = {
  orderNumber: number;
  currentDate: string;
  cartItems: Product[];
  totalQuantity: number;
  totalPrice: number;
};

export async function downloadPdf({
  orderNumber,
  currentDate,
  cartItems,
  totalQuantity,
  totalPrice,
}: PDFProps) {
  const requestBody = JSON.stringify({
    orderNumber,
    currentDate,
    cartItems,
    totalQuantity,
    totalPrice,
  });

  const response = await fetch('/api/download-receipt', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: requestBody,
  });

  if (!response.ok) {
    console.error('Failed to generate PDF');
    return;
  }

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'document.pdf';
  a.click();

  URL.revokeObjectURL(url);
}
