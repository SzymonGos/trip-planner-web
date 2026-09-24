'use client';

import React, { FC } from 'react';
import { CldImage } from 'next-cloudinary';
import { Trash2 } from 'lucide-react';
import { getCloudinaryTripImageSrc } from '@/features/user/utils/getCloudinaryImageSrc';
import type { TripImagesResponse } from '../../types/types';

export type TTripImagesDisplayProps = {
  className?: string;
  disabled?: boolean;
  images: TripImagesResponse[];
  tripId?: string;
  onExistingImageRemove?: (imageId: number) => void;
};

export const TripImagesDisplay: FC<TTripImagesDisplayProps> = ({
  className,
  disabled,
  images,
  onExistingImageRemove,
}) => (
  <div className={`flex gap-2 items-center flex-wrap ${className || ''}`}>
    {images.map((img) => (
      <div
        key={img.id}
        className="relative w-20 h-20 flex flex-col items-center justify-center border rounded-md overflow-hidden group bg-muted"
      >
        <CldImage
          src={getCloudinaryTripImageSrc(img?.publicId)}
          alt={`Trip image ${img?.publicId}`}
          width={80}
          height={80}
          className="object-cover w-full h-full"
        />
        <button
          type="button"
          className="absolute top-1 right-1 bg-white/80 rounded-full p-1 opacity-0 group-hover:opacity-100 transition disabled:opacity-50"
          onClick={() => onExistingImageRemove(img?.id)}
          aria-label="Remove image"
          disabled={disabled}
        >
          <Trash2 size={16} className="text-destructive" />
        </button>
      </div>
    ))}
  </div>
);
