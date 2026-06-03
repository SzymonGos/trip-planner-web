import React, { FC } from 'react';
import { CldImage } from 'next-cloudinary';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TripImage as TTripImage } from 'tp-graphql-types';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface FullScreenGalleryProps {
  images: TTripImage[];
  isOpen: boolean;
  onClose: () => void;
  fullScreenSrc: string;
  goToPrevious: () => void;
  goToNext: () => void;
  currentIndex: number;
}

export const FullScreenGallery: FC<FullScreenGalleryProps> = ({
  images,
  isOpen,
  onClose,
  fullScreenSrc,
  goToPrevious,
  goToNext,
  currentIndex,
}) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="w-screen h-screen max-w-none backdrop-blur-sm border-0 bg-black/30 p-0 rounded-none">
      <DialogTitle className="sr-only">Trip Image Gallery</DialogTitle>
      <div className="relative w-full h-full flex items-center justify-center overflow-auto">
        <CldImage
          src={fullScreenSrc}
          alt="Trip image"
          width={4000}
          height={3000}
          className="object-contain max-h-full max-w-full"
          priority
          quality={95}
        />
      </div>
      {images.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 hover:bg-white/10"
          >
            <ChevronLeft className="h-8 w-8" />
            <span className="sr-only">Previous image</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 hover:bg-white/10"
          >
            <ChevronRight className="h-8 w-8" />
            <span className="sr-only">Next image</span>
          </Button>
        </>
      )}

      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-3 py-1 rounded-full text-sm">
          {currentIndex + 1} of {images.length}
        </div>
      )}
    </DialogContent>
  </Dialog>
);
