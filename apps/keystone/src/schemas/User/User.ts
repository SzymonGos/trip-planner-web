import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { text, timestamp, checkbox, integer } from '@keystone-6/core/fields';
import { cloudinaryImage } from '@keystone-6/cloudinary';
import { CLOUDINARY_CONFIGS } from '../../../config';
import { removeCloudinaryImage } from './hooks/removeCloudinaryImage';

export const User = list({
  fields: {
    clerkId: text({
      validation: { isRequired: true },
      isIndexed: 'unique',
      access: { update: () => false },
      ui: {
        itemView: { fieldMode: 'read' },
      },
    }),
    createdAt: timestamp({
      defaultValue: { kind: 'now' },
      ui: {
        itemView: { fieldMode: 'read' },
        listView: { fieldMode: 'hidden' },
      },
    }),
    username: text({
      validation: {
        isRequired: true,
        length: {
          min: 5,
          max: 15,
        },
      },
      isIndexed: 'unique',
    }),
    email: text({ validation: { isRequired: true } }),
    profileImage: cloudinaryImage({
      cloudinary: CLOUDINARY_CONFIGS,
      hooks: {
        beforeOperation: (...args) => {
          console.log('beforeOperation user profile image triggered');
          removeCloudinaryImage('profileImage')?.(...args);
        },
      },
    }),
    deletedAt: timestamp({
      ui: {
        itemView: { fieldMode: 'read' },
        listView: { fieldMode: 'hidden' },
      },
    }),
    isDeleted: checkbox({
      defaultValue: false,
      ui: {
        itemView: { fieldMode: 'read' },
        listView: { fieldMode: 'hidden' },
      },
    }),
    googleMapsRouteCount: integer({
      defaultValue: 0,
      ui: {
        itemView: { fieldMode: 'edit' },
        listView: { fieldMode: 'hidden' },
      },
    }),
    googleMapsRouteResetDate: timestamp({
      defaultValue: { kind: 'now' },
      ui: {
        itemView: { fieldMode: 'read' },
        listView: { fieldMode: 'hidden' },
      },
    }),
    aiChatUsageCount: integer({
      defaultValue: 0,
      ui: {
        itemView: { fieldMode: 'edit' },
        listView: { fieldMode: 'hidden' },
      },
    }),
    aiChatUsageResetDate: timestamp({
      defaultValue: { kind: 'now' },
      ui: {
        itemView: { fieldMode: 'read' },
        listView: { fieldMode: 'hidden' },
      },
    }),
  },
  access: allowAll,
});
