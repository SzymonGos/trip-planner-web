import React, { FC, RefObject, ChangeEvent } from 'react';
import { AddImageButton } from './AddImageButton';
import Image from 'next/image';
import { Trash2 } from 'lucide-react';
import { TTripImageFormValueProps } from '../../hooks/useTripFormSync';
import { getCloudinaryImageSrc } from '@/features/user/utils/getCloudinaryImageSrc';

export type TTripImagesUploadProps = {
  className?: string;
  disabled?: boolean;
  fileInputRef: RefObject<HTMLInputElement>;
  images: (File | TTripImageFormValueProps)[];
  onAddImages: () => void;
  onFilesChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onRemove: (index: number) => void;
  canAddMore?: boolean;
};

export const TripImagesUpload: FC<TTripImagesUploadProps> = ({
  disabled,
  fileInputRef,
  images,
  onAddImages,
  onFilesChange,
  onRemove,
  canAddMore,
}) => (
  <div className="flex gap-2 items-center flex-wrap">
    {images.map((img, idx) => {
      let src = '';
      if (img instanceof File) {
        src = URL.createObjectURL(img);
      } else {
        src = getCloudinaryImageSrc(img?.image?.id);
      }
      return (
        <div
          key={idx}
          className="relative w-20 h-20 flex flex-col items-center justify-center border rounded-md overflow-hidden group bg-muted"
        >
          <Image src={src} alt={`Trip image ${idx + 1}`} fill className="object-cover" />
          <button
            type="button"
            className="absolute top-1 right-1 bg-white/80 rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
            onClick={() => onRemove(idx)}
            aria-label="Remove image"
          >
            <Trash2 size={16} className="text-destructive" />
          </button>
        </div>
      );
    })}
    <AddImageButton onClick={onAddImages} disabled={disabled} hidden={!canAddMore} />
    <input
      ref={fileInputRef}
      type="file"
      accept="image/*"
      multiple
      className="hidden"
      onChange={onFilesChange}
      disabled={disabled}
    />
  </div>
);
