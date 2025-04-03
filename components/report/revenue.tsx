'use client';
import React, { useState, useEffect } from 'react';
import { ChevronDownIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import RevenueGraph from './RevenueGraph';
import { useStore } from '@/store/useStore';

const RevenueReport = () => {
  const organizationId = useStore((state) => state.organizationId);
  const [selectedItemType, setSelectedItemType] = useState<string>('');
  const [totalItemsSold, setTotalItemsSold] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!organizationId) return;

    const fetchTotalItemsSold = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/reports/sales?organization_id=${organizationId}&range=${selectedItemType || 'Monthly'}`);

        if (!res.ok) {
          const errorText = await res.text();
          console.error('Error response body:', errorText);
          throw new Error('Failed to fetch data');
        }

        const data = await res.json();
        console.log('Fetched total items sold:', data);
        setTotalItemsSold(data.total || 0);
      } catch (error) {
        console.error('Failed to fetch total items sold:', error);
        setTotalItemsSold(0);
      } finally {
        setLoading(false);
      }
    };

    fetchTotalItemsSold();
  }, [organizationId, selectedItemType]);

  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div className='col-span-2'>
          <RevenueGraph />
        </div>

        <div className='bg-white p-6 lg:rounded-xl shadow'>
          <div className='flex   justify-between'>
            <div className='flex justify-center gap-3'>
              <div className='flex size-[32px] border rounded-[8px] items-center justify-center'>
                <Image
                  src='/icons/TotalItems.svg'
                  alt='Sales Table Icon'
                  className='mx-auto size-fit'
                  width={17}
                  height={17}
                />
              </div>
              <h2 className='text-[16px] mb-4 mt-1'>Total Items Sold</h2>
            </div>

            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type='button'
                    className='border-gray-300 flex h-[32px] gap-2.5 items-center justify-between rounded-[9px] border bg-white p-2 lg:p-3 text-left'
                  >
                    <div className='flex items-center gap-2'>
                      <span
                        className={`text-[12px] font-circular-normal ${selectedItemType ? 'text-black' : 'text-[#B8B8B8]'}`}
                      >
                        {selectedItemType || 'Monthly'}
                      </span>
                    </div>
                    <ChevronDownIcon className='h-4 w-4 text-gray-400' />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='max-h-60 min-w-0 overflow-y-auto lg:w-full'>
                  <DropdownMenuItem
                    onClick={() => setSelectedItemType('Weekly')}
                  >
                    Weekly
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setSelectedItemType('Monthly')}
                  >
                    Monthly
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setSelectedItemType('Yearly')}
                  >
                    Yearly
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className='h-48 rounded flex items-center justify-center'>
            {loading ? (
              <p className='text-sm text-gray-400'>Loading...</p>
            ) : totalItemsSold > 0 ? (
              <div className='flex flex-col items-center gap-2'>
                <p className='text-[32px] font-bold text-black'>{totalItemsSold}</p>
                <p className='text-[14px] text-gray-500'>Items sold</p>
              </div>
            ) : (
              <div className='flex flex-col items-center gap-4'>
                <Image
                  src='/icons/emptyState.svg'
                  alt='Sales Table Icon'
                  className=''
                  width={56}
                  height={56}
                />
                <p className='text-[20px] text-gray-500'>No items sold yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueReport;
