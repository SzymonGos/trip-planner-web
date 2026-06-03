import React, { FC } from 'react';
import { ChevronIcon } from '@/components/Icons/ChevronIcon';

interface ArrowButtonProps {
  direction: 'left' | 'right';
  onClick: () => void;
  ariaLabel?: string;
  className?: string;
}

export const ArrowButton: FC<ArrowButtonProps> = ({ direction, onClick, ariaLabel, className }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={ariaLabel || (direction === 'left' ? 'Previous' : 'Next')}
    className={`absolute top-1/2 ${direction === 'left' ? 'left-2 -translate-y-1/2' : 'right-2 -translate-y-1/2'} bg-white/80 rounded-full p-2 shadow hover:bg-white ${className || ''}`}
  >
    <div className={direction === 'left' ? 'rotate-180' : ''}>
      <ChevronIcon />
    </div>
  </button>
);
