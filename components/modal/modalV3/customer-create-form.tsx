'use client';

import { Icons } from '@/components/ui/icons';
import { useCreateCustomerMutation } from '@/redux/features/customer/customer.api';
import {
  clearCart,
  toggleSaleSuccessful,
} from '@/redux/features/product/product.slice';
import { AppDispatch } from '@/redux/store';
import { useStore } from '@/store/useStore';
import Image from 'next/image';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import CountryPhoneInput from './country-phone-input';
type Props = {
  onClose: () => void;
};
export default function CreateCustomerForm({ onClose }: Props) {
  const [sendMethod, setSendMethod] = useState<
    'sms' | 'email' | 'whatsapp' | null
  >(null);
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');

  const dispatch: AppDispatch = useDispatch();
  const organizationId = useStore((state) => state.organizationId);

  const handleSendMethodChange = (method: 'sms' | 'email' | 'whatsapp') => {
    setSendMethod(method === sendMethod ? null : method);
  };
  const [createCustomer, { isLoading: isCreatingCustomer }] =
    useCreateCustomerMutation();

  const handleSaveCustomerDetails = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!customerName.trim()) {
      return toast.error('Please enter a valid customer name.');
    }

    const [first_name, ...lastNameParts] = customerName.trim().split(' ');
    const last_name = lastNameParts.join(' ') || '';

    try {
      await createCustomer({
        organization_id: organizationId,
        first_name,
        last_name,
      })
        .unwrap()
        .then(() => {
          toast.success('Customer details saved.');
          setCustomerName('');
        });
    } catch (error) {
      console.error('Error creating customer:', error);
    }
  };

  return (
    <form
      onSubmit={handleSaveCustomerDetails}
      className='flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 w-full scrollbar-track-transparent hover:scrollbar-thumb-gray-400'
    >
      <div className='mb-5'>
        <input
          type='text'
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder='Customer Name'
          className='w-full border text-base placeholder:text-[#B8B8B8] border-gray-300 rounded-[9px] px-4 py-1 focus:outline-none focus-within:border-green-500 focus-within:bg-white'
        />
      </div>

      <div className='mb-5'>
        <div className='relative'>
          <CountryPhoneInput
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            type='tel'
            placeholder='000 000 0000'
          />
        </div>
      </div>

      <div className='mb-5'>
        <input
          type='email'
          value={emailAddress}
          onChange={(e) => setEmailAddress(e.target.value)}
          placeholder='johndoe@example.com'
          className='w-full border text-base placeholder:text-[#B8B8B8] border-gray-300 rounded-[9px] px-4 py-1 focus:outline-none focus-within:border-green-500 focus-within:bg-white'
        />
      </div>

      <div className='border-t border-dashed border-gray-300 my-2' />

      <div className='flex flex-col gap-5 mt-2'>
        <label className='flex items-center gap-2 cursor-pointer'>
          <div className='relative flex items-center'>
            <input
              type='checkbox'
              name='sendMethod'
              value='whatsapp'
              checked={sendMethod === 'whatsapp'}
              onChange={() => handleSendMethodChange('whatsapp')}
              className='peer appearance-none h-4 w-4 border border-gray-300 rounded peer'
            />

            <div className='absolute inset-0 flex items-center justify-center opacity-0 peer-checked:opacity-100'>
              <Image
                src='/modal-images/checkbox.svg'
                alt='Checked'
                width={20}
                height={20}
              />
            </div>
          </div>
          <span className='text-base 2xl:text-lg'>
            Send receipt via WhatsApp
          </span>
        </label>

        <label className='flex items-center gap-2 cursor-pointer'>
          <div className='relative flex items-center'>
            <input
              type='checkbox'
              name='sendMethod'
              value='sms'
              checked={sendMethod === 'sms'}
              onChange={() => handleSendMethodChange('sms')}
              className='peer appearance-none h-4 w-4 border border-gray-300 rounded'
            />

            <div className='absolute inset-0 flex items-center justify-center opacity-0 peer-checked:opacity-100'>
              <Image
                src='/modal-images/checkbox.svg'
                alt='Checked'
                width={20}
                height={20}
              />
            </div>
          </div>
          <span className='text-base 2xl:text-xl'>Send receipt via SMS</span>
        </label>
        <label className='flex items-center gap-2 cursor-pointer'>
          <div className='relative flex items-center'>
            <input
              type='checkbox'
              name='sendMethod'
              value='email'
              checked={sendMethod === 'email'}
              onChange={() => handleSendMethodChange('email')}
              className='peer appearance-none h-4 w-4 border border-gray-300 rounded'
            />

            <div className='absolute inset-0 flex items-center justify-center opacity-0 peer-checked:opacity-100'>
              <Image
                src='/modal-images/checkbox.svg'
                alt='Checked'
                width={20}
                height={20}
              />
            </div>
          </div>
          <span className='text-base 2xl:text-xl'>Send receipt via email</span>
        </label>
      </div>

      <div className='border-t border-dashed border-gray-300 my-2' />

      <div className='flex flex-col sm:flex-row items-center gap-4 w-full my-3'>
        <button
          type='submit'
          className='w-full py-3 px-6 rounded-[12px] flex items-center justify-center gap-2 border border-[#1B1B1B] cursor-pointer hover:bg-gray-100 transition-colors'
        >
          {isCreatingCustomer ? (
            <>
              <Icons.LoadingIcon />
              <span className='text-base'>Saving Customer Info</span>
            </>
          ) : (
            <>
              <Image
                src='/modal-images/customer.svg'
                alt='Save Customer'
                width={18}
                height={18}
              />
              <span className='text-base'>Save Customer Info</span>
            </>
          )}
        </button>
        <button
          type='button'
          onClick={() => {
            onClose();
            dispatch(clearCart());
            dispatch(toggleSaleSuccessful());
          }}
          className={`w-full py-3 px-6 rounded-[12px] flex items-center justify-center gap-2 text-white bg-[#1B1B1B] hover:bg-[#333333] cursor-pointer transition-colors`}
        >
          <Image
            src='/modal-images/endsale.svg'
            alt='End Sale'
            width={18}
            height={18}
          />
          <span className='text-base'>End Sale</span>
        </button>
      </div>
    </form>
  );
}
