'use client';
import {
  selectTotalPrice,
  selectTotalQuantity,
} from '@/redux/features/product/product.slice';
import { RootState } from '@/redux/store';
import { Product } from '@/types/product';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import CheckoutItem from './checkout-item';

interface CheckoutReceiptProps {
  cartItems: Product[];
}

export default function CheckoutReciept({ cartItems }: CheckoutReceiptProps) {
  const orderNumber = useSelector((state: RootState) => state.cart.salesCount);
  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const totalQuantity = useSelector(selectTotalQuantity);
  const totalPrice = useSelector(selectTotalPrice);

  if (cartItems.length === 0) {
    return <p className='text-center text-gray-500'>Your cart is empty.</p>;
  }

  return (
    <>
      {/* Customer Receipt */}
      <div className='bg-[#F6F8FA] w-full lg:w-1/2 p-6 '>
        <div className='rounded-[20px] bg-white p-8 h-full relative flex flex-col'>
          {/* Receipt content goes here */}
          <h2 className='font-bold text-base md:text-2xl uppercase'>
            Customer Receipt
          </h2>
          <div className='flex gap-3 item-center text-sm text-gray-500'>
            Order #{orderNumber} | {currentDate}
          </div>

          <div className='border-t border-dashed border-gray-300 my-2' />

          <h2 className='font-sans text-xl text-[#2A2A2A] tracking-normal font-semibold'>
            {cartItems.length > 1 ? 'ITEMS' : 'ITEM'}
          </h2>

          <div className='flex flex-col gap-2'>
            {/* Receipt details will go here */}
            <div className='flex flex-col '>
              {cartItems?.map((item) => (
                <CheckoutItem item={item} key={item.id} />
              ))}
            </div>
            <div className='grid grid-cols-3 font-bold uppercase'>
              <span className='text-base capitalize '>Total</span>
              <span className='text-base capitalize text-center'>
                {totalQuantity}
              </span>
              <span className='ftext-lg font-circular-medium text-center'>
                ₦ {totalPrice.toLocaleString()}
              </span>
            </div>
          </div>

          <div className='border-t border-dashed border-gray-300 my-2' />

          <div className='flex flex-col items-center justify-center text-[#888888] mt-auto gap-1'>
            <p className='text-lg leading-7 uppercase'>
              Thank you for your purchase
            </p>
            <p className='text-lg'>12:00</p>
          </div>

          <Image
            src='/modal-images/border.svg'
            alt='border'
            className='absolute -bottom-1 left-0 w-full rounded-bl-2xl rounded-br-2xl'
            width={16}
            height={16}
          />
        </div>
      </div>
    </>
  );
}
