/* eslint-disable @typescript-eslint/no-explicit-any */
import { v2 as cloudinary } from 'cloudinary';
import { TCloudinaryImageProps } from '../../../../config';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

type BeforeOperationArgs = {
  operation: 'create' | 'update' | 'delete';
  resolvedData: Record<string, any>;
  item?: Record<string, any>;
};

const renameCloudinaryImage = async (publicId: string) => {
  if (!publicId) {
    console.log('No public_id provided');
    return;
  }

  try {
    const filename = publicId.split('/').pop() || publicId;
    const newPublicId = `removed-${filename}`;
    const fullPublicId = `${process.env.CLOUDINARY_API_FOLDER}/${filename}`;

    await cloudinary.uploader.rename(fullPublicId, `${newPublicId}`, {
      invalidate: true,
    });
    console.log(`Successfully renamed ${fullPublicId} to ${newPublicId}`);
  } catch (error) {
    console.error('Failed to rename Cloudinary image:', error);
  }
};

export const removeCloudinaryImage =
  (field: string) =>
  async ({ item, operation, resolvedData }: BeforeOperationArgs) => {
    try {
      if (operation === 'create') return;

      if (!item?.[field]) return;

      const profileImage = item[field] as TCloudinaryImageProps;
      const currentId = profileImage.id;
      if (!currentId) return;

      switch (operation) {
        case 'update':
          if (resolvedData[field] && (resolvedData[field] as TCloudinaryImageProps).id !== currentId) {
            console.log(`Cleaning up old image on update: ${currentId}`);
            await renameCloudinaryImage(currentId);
          }
          break;

        case 'delete':
          console.log(`Cleaning up image on delete: ${currentId}`);
          await renameCloudinaryImage(currentId);
          break;
      }
    } catch (error) {
      console.error('Error in removeCloudinaryImage:', error);
    }
  };
