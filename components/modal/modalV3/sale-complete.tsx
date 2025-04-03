'use client';
import {
  selectTotalPrice,
  selectTotalQuantity,
} from '@/redux/features/product/product.slice';
import { RootState } from '@/redux/store';
import { downloadPdf } from '@/services/downloadPdf';
import Image from 'next/image';
import { FaTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import CreateCustomerForm from './customer-create-form';

type Props = {
  onClose: () => void;
};

export default function SaleComplete({ onClose }: Props) {
  const totalQuantity = useSelector(selectTotalQuantity);
  const totalPrice = useSelector(selectTotalPrice);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const orderNumber = useSelector((state: RootState) => state.cart.salesCount);
  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const handleDownload = () => {
    downloadPdf({
      orderNumber: orderNumber,
      currentDate: currentDate,
      cartItems: cartItems,
      totalQuantity: totalQuantity,
      totalPrice: totalPrice,
    });
  };

  return (
    <div className='bg-white w-full lg:w-1/2 pl-6 pr-2 sm:pr-6 lg:px-6 flex flex-col h-full'>
      <div className='flex gap-2.5  pt-6 pb-1 items-center'>
        <div className='flex p-2'>
          <div className='bg-[#CCEBDB] p-4 rounded-lg flex items-center justify-center'>
            <Image
              src='/modal-images/complete.svg'
              alt='Complete Sale'
              className='w-5 h-full sm:w-6 sm:h-6'
              width={24}
              height={24}
            />
          </div>
        </div>
        <div className='flex-grow h-full py-2'>
          <h1 className='font-circular-medium text-[24px] text-left'>
            Complete Sale
          </h1>
          <p className='text-lg text-[#717171]'>
            Generate a proof of your sale.
          </p>
        </div>
        <div className='flex-shrink-0'>
          <button
            type='button'
            aria-label='Close'
            className='p-[9px] border border-[#1B1B1B] rounded-[9px] cursor-pointer hover:bg-[#D0D0D0]'
          >
            <FaTimes />
          </button>
        </div>

        {/* Print Receipt Button */}
      </div>

      <button
        className='w-full bg-[#1B1B1B] text-white py-2 rounded-lg flex items-center cursor-pointer justify-center gap-2'
        onClick={handleDownload}
      >
        <Image
          src='/modal-images/print.svg'
          alt='Print Receipt'
          width={16}
          height={16}
        />
        Print Receipt
      </button>

      <div className='border-t border-dashed border-gray-300 my-4' />

      <CreateCustomerForm onClose={onClose} />
    </div>
  );
}
