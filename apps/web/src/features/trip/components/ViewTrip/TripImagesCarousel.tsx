import React, { FC } from 'react';
import { CldImage } from 'next-cloudinary';
import { TripImage as TTripImage } from 'tp-graphql-types';
import { ArrowButton } from './ArrowButton';
import { EmblaViewportRefType } from 'embla-carousel-react';
import { getCloudinaryImageSrc } from '@/features/user/utils/getCloudinaryImageSrc';

interface TripImagesCarouselProps {
  images: TTripImage[];
  emblaRef: EmblaViewportRefType;
  scrollPrev: () => void;
  scrollNext: () => void;
  handleImageClick: (index: number) => void;
}

export const TripImagesCarousel: FC<TripImagesCarouselProps> = ({
  images,
  emblaRef,
  scrollPrev,
  scrollNext,
  handleImageClick,
}) => (
  <div className="w-full mt-16 lg:max-w-xl mx-auto">
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex h-[200px]">
          {images.map((img, index) => {
            const src = getCloudinaryImageSrc(img?.image?.id);
            return (
              <div
                className="flex-shrink-0 h-[200px] w-1/2 relative mr-2 cursor-pointer hover:opacity-90 transition-opacity"
                key={img.id}
                onClick={() => handleImageClick(index)}
              >
                <CldImage
                  src={src}
                  alt="Trip image"
                  fill
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />
              </div>
            );
          })}
        </div>
      </div>
      {images.length > 2 && (
        <>
          <ArrowButton direction="left" onClick={scrollPrev} ariaLabel="Previous image" />
          <ArrowButton direction="right" onClick={scrollNext} ariaLabel="Next image" />
        </>
      )}
    </div>
  </div>
);
