import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: '../../apps/keystone/schema.graphql',
  generates: {
    './src/': {
      preset: 'client',
      plugins: [],
    },
  },
};

export default config;
