import { Button } from '@/components/ui/button';
import ctamember from '@/public/icons/cta-avatar.png';
import Image from 'next/image';
function QuestionsCTA() {
  return (
    <div className='flex flex-col items-center text-center max-w-7xl w-full p-8 bg-[#F9FAFB] rounded-2xl gap-8'>
      <Image src={ctamember} alt='CTA Avatar' />
      <h2 className='text-xl font-medium text-[#101828]'>
        Still have questions?
      </h2>
      <p className='text-[#667085] text-lg'>
        Can&apos;t find the answer you&apos;re looking for? Please chat to our
        friendly team.
      </p>
      <Button className='rounded-[9px] h-[48px] max-w-[124px] w-full cursor-pointer'>
        Start Chat
      </Button>
    </div>
  );
}

export default QuestionsCTA;
