'use client';

// import { editStock } from "@/actions/stocks";
import { Input } from '@/components/ui/input';
import { useEditStockMutation } from '@/redux/features/stock/stock.api';
import { useStore } from '@/store/useStore';
// import { useEditStockMutation } from "@/redux/features/stock/stock.api";
import { useEffect, useRef, useState, useTransition } from 'react';
import { toast } from 'sonner';

type EditableCellProps = {
  value: string;
  currency?: string;
  stockId: string;
  accessorKey: string;
  rowData: Record<string, any>;
  updateSelectedRow: (data: any) => void;
};

export function EditableCell({
  value,
  currency,
  stockId,
  accessorKey,
  rowData,
  updateSelectedRow,
}: EditableCellProps) {
  const [editing, setEditing] = useState(false);
  const [internalValue, setInternalValue] = useState<string>(value);
  const inputRef = useRef<HTMLInputElement>(null);
  const [editStock] = useEditStockMutation();
  const organization_id = useStore((state) => state.organizationId);

  const [, startTransition] = useTransition();

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  const handleSave = async () => {
    setEditing(false);
    if (internalValue !== value) {
      startTransition(async () => {
        try {
          await editStock({
            id: stockId,
            organization_id: organization_id,
            name: accessorKey === 'name' ? internalValue : rowData.name,
            quantity:
              accessorKey === 'quantity'
                ? parseInt(internalValue)
                : rowData.quantity,
            buying_price:
              accessorKey === 'buying_price'
                ? parseFloat(internalValue)
                : rowData.buying_price,
            currency_code: currency || rowData.currency_code,
          }).unwrap();

          // Update the selected row in sidebar
          updateSelectedRow({
            id: stockId,
            [accessorKey]:
              accessorKey === 'quantity'
                ? parseInt(internalValue)
                : accessorKey === 'buying_price'
                  ? parseFloat(internalValue)
                  : internalValue,
          });

          toast.success('Stock updated successfully');
        } catch (err) {
          console.error('Error updating stock:', err);
          toast.error('Stock not updated! Please try again.');
          setInternalValue(value);
        }
      });
    }
  };

  return editing ? (
    <Input
      ref={inputRef}
      value={internalValue}
      onChange={(e) => setInternalValue(e.target.value)}
      onBlur={handleSave}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          handleSave();
        }
        if (e.key === 'Escape') {
          setInternalValue(value);
          setEditing(false);
        }
      }}
      className='border-none p-5  rounded-none text-sm w-full h-full focus-visible:outline-none focus-visible:border-2 focus-visible:ring-[#B2E1C8] focus-visible:z-10 relative'
    />
  ) : (
    <Input
      ref={inputRef}
      value={
        currency
          ? `${currency ?? ''} ${internalValue?.toLocaleString() ?? ''}`
          : `${internalValue?.toLocaleString() ?? ''}`
      }
      onClick={() => setEditing(true)}
      onKeyDown={() => setEditing(true)}
      readOnly
      className='border-none p-5  rounded-none text-sm w-full h-full focus-visible:outline-none focus-visible:border-2 focus-visible:ring-[#B2E1C8] focus-visible:z-10 relative'
    />
  );
}
