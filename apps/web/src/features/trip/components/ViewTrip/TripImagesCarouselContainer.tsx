import React, { FC, useCallback, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { TripImage as TTripImage } from 'tp-graphql-types';
import { TripImagesCarousel } from './TripImagesCarousel';
import { isEmpty } from 'lodash';
import { FullScreenGalleryContainer } from '@/features/gallery/FullScreenGalleryContainer';
import Autoplay from 'embla-carousel-autoplay';

interface TripImagesCarouselContainerProps {
  images: TTripImage[];
}

export const TripImagesCarouselContainer: FC<TripImagesCarouselContainerProps> = ({ images }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ slidesToScroll: 2, loop: true }, [Autoplay({ delay: 3000 })]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setIsGalleryOpen(true);
  };

  const handleCloseGallery = () => {
    setIsGalleryOpen(false);
  };

  if (isEmpty(images)) return null;

  return (
    <>
      <TripImagesCarousel
        images={images}
        emblaRef={emblaRef}
        scrollPrev={scrollPrev}
        scrollNext={scrollNext}
        handleImageClick={handleImageClick}
      />
      <FullScreenGalleryContainer
        images={images}
        initialIndex={selectedImageIndex}
        isOpen={isGalleryOpen}
        onClose={handleCloseGallery}
      />
    </>
  );
};
