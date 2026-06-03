import { list } from '@keystone-6/core';
import { relationship, text, timestamp, select } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';
import { deleteTripImages } from './hooks/deleteTripImages';

export const Trip = list({
  fields: {
    title: text({ validation: { isRequired: true, length: { min: 5, max: 100 } } }),
    description: text({
      ui: {
        displayMode: 'textarea',
      },
      db: {
        nativeType: 'Text',
      },
    }),
    origin: text({ validation: { isRequired: true } }),
    destination: text({ validation: { isRequired: true } }),
    creator: relationship({ ref: 'User' }),
    status: select({
      type: 'enum',
      options: [
        { label: 'Planning', value: 'planning' },
        { label: 'Completed', value: 'completed' },
      ],
      defaultValue: 'planning',
      validation: { isRequired: true },
    }),
    tripImages: relationship({
      ref: 'TripImage.trip',
      many: true,
    }),
    distance: text({
      ui: {
        itemView: {
          fieldMode: 'read',
        },
      },
    }),
    estimatedDuration: text({
      ui: {
        itemView: {
          fieldMode: 'read',
        },
      },
    }),
    createdAt: timestamp({
      defaultValue: { kind: 'now' },
      ui: {
        itemView: { fieldMode: 'read' },
      },
    }),
  },
  access: allowAll,
  hooks: {
    validateInput: async ({ resolvedData, addValidationError }) => {
      const { title, origin, destination } = resolvedData;

      if (title && !/^[a-zA-Z0-9\s.,!?'-]+$/.test(title)) {
        addValidationError('Title contains invalid characters.');
      }

      if (origin && origin.length < 1) {
        addValidationError('Origin must be at least 3 characters long.');
      }

      if (destination && destination.length < 1) {
        addValidationError('Destination must be at least 3 characters long.');
      }

      if (origin && destination && origin === destination) {
        addValidationError('Origin and destination cannot be the same.');
      }
    },
    beforeOperation: async ({ operation, item, context }) => {
      if (operation === 'delete' && item?.id) {
        await deleteTripImages(String(item.id), context);
      }
    },
  },
});
