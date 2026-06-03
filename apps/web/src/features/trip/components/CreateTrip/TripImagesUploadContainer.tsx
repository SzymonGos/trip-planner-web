import React, { useRef, ChangeEvent, FC } from 'react';
import { TripImagesUpload } from './TripImagesUpload';
import { useTripImages } from '../../hooks/useTripImages';
import { TTripImageFormValueProps } from '../../hooks/useTripFormSync';

export type TTripImagesUploadContainerProps = {
  className?: string;
  disabled?: boolean;
  defaultImages?: TTripImageFormValueProps[];
  canAddMore?: boolean;
};

export const TripImagesUploadContainer: FC<TTripImagesUploadContainerProps> = ({
  className,
  disabled,
  defaultImages = [],
  canAddMore,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { newImages, handleExistingImagesRemove, handleNewImagesChange, handleNewImagesAdd } = useTripImages();

  const images = [...defaultImages, ...newImages];

  const handleAddImages = () => {
    if (!disabled) fileInputRef.current?.click();
  };

  const handleFilesChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const files = Array.from(e.target.files || []);
    handleNewImagesAdd(files);
    e.target.value = '';
  };

  const handleRemove = (index: number) => {
    const defaultImagesCount = defaultImages.length;

    if (index < defaultImagesCount) {
      // Removing an existing image (from defaultImages)
      const existingImage = defaultImages[index];
      if (existingImage?.image?.id) {
        handleExistingImagesRemove(existingImage.image.id);
      }
    } else {
      // Removing a new image (from newImages)
      const newImageIndex = index - defaultImagesCount;
      const updatedNewImages = newImages.filter((_, i) => i !== newImageIndex);
      handleNewImagesChange(updatedNewImages);
    }
  };

  return (
    <TripImagesUpload
      className={className}
      disabled={disabled}
      fileInputRef={fileInputRef}
      images={images}
      onAddImages={handleAddImages}
      onFilesChange={handleFilesChange}
      onRemove={handleRemove}
      canAddMore={canAddMore}
    />
  );
};
