import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

type CheckoutItemProps = {
  item: any;
};

export default function CheckoutItem({ item }: CheckoutItemProps) {
  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find((cartItem) => cartItem.id === item.id)
  );

  if (!cartItem) return null;

  return (
    <div className='grid grid-cols-3 w-full text-[#2A2A2A]'>
      <p className='text-base capitalize'>{cartItem.name}</p>
      <span className='text-base text-center'>{cartItem.quantity}</span>
      <p className='text-lg font-circular-medium text-center'>
        ₦ {cartItem.selling_price || cartItem.price}
      </p>
    </div>
  );
}
