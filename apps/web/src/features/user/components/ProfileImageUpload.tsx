import React, { forwardRef, useState, ChangeEventHandler } from 'react';
import { CldImage } from 'next-cloudinary';
import { getCloudinaryImageSrc } from '../utils/getCloudinaryImageSrc';
import Image from 'next/image';

type TProfileImageUploadProps = {
  defaultValue?: string;
  onFileChange?: (file: File) => void;
  className?: string;
};

export const ProfileImageUpload = forwardRef<HTMLInputElement, TProfileImageUploadProps>(
  ({ defaultValue, onFileChange, className, ...props }, ref) => {
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const handleFileChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      const file = e.target.files?.[0];

      if (file) {
        const previewImageURL = URL.createObjectURL(file);
        setPreviewImage(previewImageURL);
        onFileChange?.(file);
      } else {
        setPreviewImage(null);
      }
    };

    const displayImage = previewImage || defaultValue;

    return (
      <div className="flex justify-center">
        <div className={`relative w-[100px] h-[100px] rounded-full ${className || ''}`}>
          {displayImage ? (
            <div className="h-full w-full rounded-full flex justify-center overflow-hidden">
              {previewImage ? (
                <Image
                  className="w-full h-full object-cover"
                  alt="Profile preview"
                  src={previewImage}
                  width={100}
                  height={100}
                />
              ) : (
                <CldImage
                  src={getCloudinaryImageSrc(displayImage)}
                  width={100}
                  height={100}
                  className="w-full h-full rounded-full object-cover"
                  alt="User profile"
                />
              )}
            </div>
          ) : (
            <div className="h-full w-full rounded-full bg-gray-300" />
          )}

          <div className="cursor-pointer flex justify-center items-center absolute bg-white w-7 h-7 border-2 border-white rounded-full right-0 bottom-0 shadow-sm">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-600"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </div>

          <input
            ref={ref}
            className="opacity-0 absolute inset-0 cursor-pointer"
            type="file"
            accept="image/*"
            {...props}
            onChange={handleFileChange}
          />
        </div>
      </div>
    );
  },
);

ProfileImageUpload.displayName = 'ProfileImageUpload';
