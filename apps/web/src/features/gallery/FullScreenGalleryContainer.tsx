import React, { useEffect, useState } from 'react';
import { TripImage as TTripImage } from 'tp-graphql-types';
import { FullScreenGallery } from './FullScreenGallery';

type TFullScreenGalleryContainerProps = {
  images: TTripImage[];
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
  }, [isOpen, currentIndex, onClose]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const currentImage = images[currentIndex];
  const imageId = currentImage?.image?.id;
  const fullScreenSrc = imageId ? `tp-keystone/${imageId}` : '';

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
