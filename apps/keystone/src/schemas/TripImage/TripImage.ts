import { list } from '@keystone-6/core';
import { relationship } from '@keystone-6/core/fields';
import { cloudinaryImage } from '@keystone-6/cloudinary';
import { allowAll } from '@keystone-6/core/access';
import { CLOUDINARY_CONFIGS } from '../../../config';
import { removeCloudinaryImage } from '../User/hooks/removeCloudinaryImage';

export const TripImage = list({
  fields: {
    image: cloudinaryImage({
      cloudinary: CLOUDINARY_CONFIGS,
      hooks: {
        beforeOperation: (...args) => {
          console.log('beforeOperation trip image triggered');
          removeCloudinaryImage('image')?.(...args);
        },
      },
    }),
    trip: relationship({
      ref: 'Trip.tripImages',
      many: false,
      ui: {
        description: 'The trip this image belongs to',
      },
    }),
  },
  access: allowAll,
});
