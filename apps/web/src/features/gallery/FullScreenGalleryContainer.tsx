import React, { useEffect, useState } from 'react';
import { FullScreenGallery } from './FullScreenGallery';
import type { TripImagesResponse } from '../trip/types/types';

type TFullScreenGalleryContainerProps = {
  images: TripImagesResponse[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
};

export const FullScreenGalleryContainer = ({
  images,
  initialIndex,
  isOpen,
  onClose,
}: TFullScreenGalleryContainerProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
    }
  }, [isOpen, initialIndex]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          goToPrevious();
          break;
        case 'ArrowRight':
          event.preventDefault();
          goToNext();
          break;
        case 'Escape':
          event.preventDefault();
          onClose();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  });

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const currentImage = images[currentIndex];
  const imageId = currentImage?.publicId;
  const fullScreenSrc = imageId ? `${imageId}` : '';

  return (
    <FullScreenGallery
      images={images}
      isOpen={isOpen}
      onClose={onClose}
      fullScreenSrc={fullScreenSrc}
      goToPrevious={goToPrevious}
      goToNext={goToNext}
      currentIndex={currentIndex}
    />
  );
};
