import React, { FC } from 'react';
import { Button } from '@/components/ui/button';

type TAddImageButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
  hidden?: boolean;
};

export const AddImageButton: FC<TAddImageButtonProps> = ({ onClick, disabled, hidden = false }) => {
  if (hidden) return null;

  return (
    <Button
      type="button"
      variant="outline"
      className="w-20 h-20 flex flex-col items-center justify-center border-dashed border-2 text-muted-foreground gap-1"
      onClick={onClick}
      disabled={disabled}
    >
      <span className="text-2xl leading-none">+</span>
      <span className="text-xs">Image</span>
    </Button>
  );
};
