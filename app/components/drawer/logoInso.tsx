import { useState } from 'react';
import Image from 'next/image';

export default function HoverOverlayImages() {
  const [hoverText, setHoverText] = useState('');
  const [hoverColor, setHoverColor] = useState('bg-blue-700');
  const [isNixHover, setIsNixHover] = useState(false);
  return (
    <div className="relative flex gap-2 w-max">
      {/* Images */}
      <div className="flex gap-1">
        {/* IN Image */}
        <div
          className="cursor-pointer"
          onMouseEnter={() => {
            setHoverText('INTERNET');
            setHoverColor('bg-blue-700');
          }}
          onMouseLeave={() => setHoverText('')}
        >
          <Image src="/logo/insonix/svg/in.svg" width={40} height={40} className="object-cover w-12 h-12" alt="IN" />
        </div>

        {/* SO Image */}
        <div
          className="cursor-pointer"
          onMouseEnter={() => {
            setHoverText('SOFTWARE');
            setHoverColor('bg-gray-800');
          }}
          onMouseLeave={() => setHoverText('')}
        >
          <Image src="/logo/insonix/svg/so.svg" width={40} height={40} className="object-cover w-12 h-12" alt="SO" />
        </div>

        {/* NIX Image */}
        <div
          className="cursor-pointer"
          onMouseEnter={() => {
            setHoverText('ELECTRONIX');
            setHoverColor('bg-green-700');
            setIsNixHover(true);
          }}
          onMouseLeave={() => {
            setHoverText('');
            setIsNixHover(false);
          }}
        >
          <Image src="/logo/insonix/svg/nix.svg" width={50} height={40} className="object-cover w-15 h-12" alt="NIX" />
        </div>
      </div>

      {/* Overlay covering all images */}
      <div
        className={`absolute inset-0 flex items-center justify-center text-white text-[25px] font-bold
  transition-opacity duration-300 pointer-events-none
  ${hoverText ? `${hoverColor} opacity-100` : 'opacity-0'}`}
        style={
          isNixHover
            ? {
                clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 9px), calc(100% - 9px) 100%, 0 100%)',
              }
            : undefined
        }
      >
        {hoverText}
      </div>
    </div>
  );
}
