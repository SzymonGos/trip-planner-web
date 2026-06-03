import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { password, text } from '@keystone-6/core/fields';

export const Admin = list({
  access: allowAll,
  fields: {
    name: text({
      validation: { isRequired: true },
      isIndexed: 'unique',
    }),
    password: password({
      validation: { isRequired: true },
    }),
  },
  ui: {
    listView: {
      initialColumns: ['name'],
    },
  },
});
