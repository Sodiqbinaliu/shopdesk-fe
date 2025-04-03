'use client';
import type { StockItem } from '@/types/stocks';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FaMinus, FaPlus, FaTimes } from 'react-icons/fa';
import { toast } from 'sonner';
import { useEditStockMutation } from '@/redux/features/stock/stock.api';
import { useStore } from '@/store/useStore';

interface EditQuantityModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: StockItem | null;
  onSave: (updatedItem: StockItem) => void;
  openSuccessModal: () => void;
}

export default function EditQuantityModal({
  isOpen,
  onClose,
  item,
  onSave,
  openSuccessModal,
}: EditQuantityModalProps) {
  const [quantity, setQuantity] = useState(0);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [editStock, { isLoading }] = useEditStockMutation();
  const organizationId = useStore((state) => state.organizationId);

  useEffect(() => {
    if (item) {
      setQuantity(item.quantity);
    }
  }, [item]);

  if (!(isOpen && item)) {
    return null; 
  }

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 0 ? prev - 1 : 0));

  const isFormValid = () => {
    return quantity > 0;
  };

  // Inside EditQuantityModal's handleSubmit function:
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (isFormValid() && item) {
    try {
      await editStock({
        id: item.id,
        organization_id: organizationId,
        quantity: quantity,
        name: item.name,
        buying_price: item.buying_price,
        currency_code: item.currency_code,
      }).unwrap();
      
      const updatedItem: StockItem = {
        ...item,
        quantity: quantity
      };
      
      onSave(updatedItem);
      openSuccessModal();
      onClose();
    } catch (error) {
      console.error('Failed to update quantity:', error);
      toast.error('Error updating quantity');
    }
  }
};
  return (
    <div className='fixed inset-0 bg-[#24242433] bg-opacity-20 flex items-center justify-center p-4'>
      <div className='bg-white rounded-lg shadow-lg w-full border border-[#A0A0A0] max-w-[564px] flex flex-col gap-[28px]'>
        <div className='p-6 gap-5 flex flex-col'>
          <div className='flex gap-2.5'>
            <div className='flex p-2 '>
              <div className='bg-[#CCEBDB] p-4 rounded-lg flex items-center justify-center'>
                <Image
                  src='/modal-images/bank.svg'
                  alt='Edit Quantity'
                  className='w-5 h-5 sm:w-6 sm:h-6'
                  width={24}
                  height={24}
                />
              </div>
            </div>
            <div className='flex-grow h-full py-2'>
              <h1 className='font-circular-medium text-[24px] text-left'>
                Edit Your Stock Quantity
              </h1>
            </div>
            <div className='flex-shrink-0'>
              <button
                type='button'
                aria-label='Close'
                onClick={onClose}
                className='p-[9px] border border-[#1B1B1B] rounded-[9px] cursor-pointer hover:bg-[#D0D0D0]'
              >
                <FaTimes />
              </button>
            </div>
          </div>
          <form onSubmit={handleSubmit} className='flex flex-col gap-[20px]'>
            <div className='flex flex-col gap-[8px]'>
              {/*<label className="font-circular-normal text-[14px] text-[#717171] text-left">
                Quantity
              </label>*/}
              <div className='flex items-center gap-[8px]'>
                <button
                  type='button'
                  aria-label='Decrease Quantity'
                  className='h-[48px] md:h-[62px] w-[48px] md:w-[62px] flex items-center justify-center border border-[#1B1B1B] rounded-[9px] cursor-pointer hover:bg-[#D0D0D0]'
                  onClick={decrement}
                >
                  <FaMinus className='w-4 h-4 md:w-5 md:h-5' />
                </button>

                <div className='flex-grow relative'>
                  <input
                    type='number'
                    inputMode='numeric'
                    className='w-full h-[48px] md:h-[62px] rounded-[9px] p-[12px] outline-none border border-[#DEDEDE] focus:outline-none focus:ring-2 focus:ring-[#CCEBDB] focus:border-[#009A49] hover:ring-2 hover:ring-[#CCEBDB] transition-all placeholder:text-[#B8B8B8] text-[#2A2A2A] text-[16px] font-circular-normal text-center'
                    placeholder='Quantity'
                    value={quantity === 0 ? '' : quantity}
                    onChange={(e) => {
                      const value = e.target.value;

                      if (/^\d*$/.test(value)) {
                        setQuantity(
                          value === '' ? 0 : Number.parseInt(value, 10)
                        );
                        setErrors((prev) => ({ ...prev, quantity: '' }));
                      } else {
                        setErrors((prev) => ({
                          ...prev,
                          quantity: 'Please enter a valid number.',
                        }));
                      }
                    }}
                    required
                  />
                </div>

                <button
                  type='button'
                  aria-label='Increase Quantity'
                  className='h-[48px] md:h-[62px] w-[48px] md:w-[62px] flex items-center justify-center border border-[#1B1B1B] rounded-[9px] cursor-pointer hover:bg-[#D0D0D0]'
                  onClick={increment}
                >
                  <FaPlus className='w-4 h-4 md:w-5 md:h-5' />
                </button>
              </div>
              {errors.quantity && (
                <p className='text-[#FF1925] text-[14px] font-circular-normal text-left mt-1'>
                  {errors.quantity}
                </p>
              )}
            </div>

            <div className='md:bg-[#F6F8FA] md:border md:border-[#DEE5ED] rounded-bl-[12px] rounded-br-[12px] w-full p-4'>
              <div className='flex flex-col-reverse md:flex-row justify-end gap-4 w-full'>
                <button
                  type='button'
                  onClick={onClose}
                  className='w-full md:w-auto bg-white border md:border-[#1B1B1B] border-[#E50000] md:text-black text-[#FF000D] px-[24px] py-[12px] rounded-[12px] hover:bg-[#D0D0D0]'
                >
                  Cancel
                </button>

                <button
                  type='submit'
                  className={`w-full md:w-auto px-[24px] py-[12px] rounded-[12px] border ${
                    isFormValid()
                      ? 'bg-black text-white border-black'
                      : 'bg-[#D0D0D0] text-[#F1F1F1] border-[#B8B8B8]'
                  }`}
                  disabled={!isFormValid() || isLoading}
                >
                  {isLoading ? 'Saving...' : 'Save'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}