'use client';

import React, { FC, useState } from 'react';
import { CldImage } from 'next-cloudinary';
import { Trash2 } from 'lucide-react';
import { getCloudinaryTripImageSrc } from '@/features/user/utils/getCloudinaryImageSrc';
import { useTripImages } from '../../hooks/useTripImages';
import cx from 'classnames';
import type { TripImagesResponse } from '../../types/types';

export type TTripImagesDisplayProps = {
  className?: string;
  disabled?: boolean;
  images: TripImagesResponse[];
  tripId?: string;
};

export const TripImagesDisplay: FC<TTripImagesDisplayProps> = ({ className, disabled, images, tripId }) => {
  const { handleExistingImagesRemove } = useTripImages();
  const [deletingImageId, setDeletingImageId] = useState<string | null>(null);

  // todo: delete trip image api

  const handleRemove = async (imageId: string) => {
    if (disabled || !imageId) return;

    try {
      setDeletingImageId(imageId);

      // delet trip

      handleExistingImagesRemove(imageId);
      setDeletingImageId(null);
    } catch (error) {
      console.error('Failed to delete image:', error);
    }
  };

  return (
    <div className={`flex gap-2 items-center flex-wrap ${className || ''}`}>
      {images.map((img) => {
        // const isDeleting = deletingImageId === img.id;
        const isDeleting = false;
        return (
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
              onClick={() => handleRemove(img?.publicId)}
              aria-label="Remove image"
              disabled={disabled || isDeleting}
            >
              <Trash2 size={16} className={cx('text-destructive', { 'animate-spin': isDeleting })} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
